import {sectionRepository, SectionRepository} from "~repositories";
import {Section, SectionRequest} from "~@domain";
import {ExistedSectionError, NotFoundSectionError} from "~exceptions";
import {getNextIdx} from "~utils";

export class SectionService {
  constructor(
    private readonly sectionRepository: SectionRepository
  ) {}

  public getSections(): Section[] {
    return this.sectionRepository.get() || [];
  }

  private getSectionIndex(idx: number, sections: Section[] = this.getSections()): number {
    const index = sections.findIndex(v => v.idx === idx);
    if (index === -1) {
      throw new NotFoundSectionError();
    }
    return index;
  }

  public addSection(request: SectionRequest): void {
    const sections = this.getSections();
    const has = !!sections.find(v => v.upStation === request.upStation && v.downStation === request.downStation);
    if (has) {
      throw new ExistedSectionError();
    }

    this.sectionRepository.set([
      ...sections,
      {
        ...request,
        idx: getNextIdx(),
      }
    ]);
  }

  public updateSection(section: Section) {
    const sections = this.getSections();
    const index = this.getSectionIndex(section.idx, sections);
    sections[index] = section;

    this.sectionRepository.set(sections);
  }

  public removeSection(stationIdx: number) {
    const sections = this.getSections();
    const upStationSection = sections.find(v => v.downStation === stationIdx); // A -> B
    if (upStationSection) sections.splice(sections.indexOf(upStationSection), 1);

    const downStationSection = sections.find(v => v.upStation === stationIdx); // B -> C
    if (downStationSection) sections.splice(sections.indexOf(downStationSection), 1);

    // A -> C
    if (upStationSection && downStationSection) {
      sections.push({
        idx: getNextIdx(),
        line: upStationSection.line,
        upStation: upStationSection.upStation,
        downStation: downStationSection.downStation,
      })
    }

    this.sectionRepository.set(sections);
  }
}

export const sectionService = new SectionService(sectionRepository);
