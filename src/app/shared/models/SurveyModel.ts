export default class Survey {
    pages = Array<Page>();
}

class Page {
    name: string = '';
    description: string = '';
    sections = Array<Section>();
}

class Section {
    name: string = '';
    description: string = '';
    questions = Array<Question>();
}

class Question {
    id: string = '';
    column_match: string = '';
    text: string = '';
    description: string = '';
    type: string = '';
    q_options = Array<Option>();
}

class Option {
    id: string = '';
    name: string = '';
}