class SurveyResponse {
    ans = Array<Answer>();
}

class Answer {
    column_match: string = '';
    q_ans: string | number = '';
    q_id: string = '';
}

export {SurveyResponse, Answer}