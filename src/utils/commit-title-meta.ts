import { CommitTitles } from "./commit-titles";

export default class CommitTitleMeta {
    constructor(
        public title: CommitTitles,
        public description: string,
        public emoji: string
    ) {

    };
}