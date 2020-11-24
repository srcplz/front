import Author from "./Author";

export default interface SheetSummary {
    id: string,
    summary: string,
    likes: bigint,
    author: Author,
    tags: string[]
}