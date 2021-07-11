import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Survey from 'src/app/shared/models/SurveyModel';
import { Answer, SurveyResponse } from 'src/app/shared/models/SurveyResponse';
import { SurveyService } from 'src/app/shared/services/survey.service';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

    myFormGroup: any;

    formTemplate = new Survey();

    ready: boolean = false;

    showError: boolean = false;

    currentPage: number = 0;

    constructor(private surveyService: SurveyService) { }

    ngOnInit(): void {
        this.getSurvey();
    }

    getSurvey() {
        const url =
            'http://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both'

        this.surveyService.getSurveyQuestions(url)
            .then((res) => {
                const formData = res.forms[0];
                this.formTemplate = res.forms[0];
                this.ready = true;
                this.showError = false;

                // generate form model
                let group: { [key: string]: FormControl} = {};

                this.formTemplate.pages.forEach(page => {
                    page.sections.forEach(section => {
                        section.questions.forEach(question => {
                            group[question.column_match] = new FormControl('');
                        })
                    })
                });

                this.myFormGroup = new FormGroup(group);

            })
            .catch((error) => {
                this.showError = true;
                console.log(error);
            });
    }

    onSubmit(){
        const url = 'http://fullstack-role.busara.io/api/v1/recruitment/answers/submit/';

        // Create return model
        const answers = new Array<Answer>();
        const data = this.myFormGroup.value;
        for(let key in data){
            const ans = new Answer();
            ans.column_match = key;
            ans.q_ans = data[key];
            ans.q_id = this.getQuestionId(key);

            answers.push(ans);
        }

        const response = new SurveyResponse();
        response.ans = answers;

        // Make a post call to the survey service ans post the data
        this.surveyService.submitAnswers(url, [response]).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        

    }

    getQuestionId(columnMatch: string): string{
        let qId = '';
        this.formTemplate.pages.forEach(p => {
            p.sections.forEach(s => {
                const q = s.questions.find(q => q.column_match === columnMatch);
                if(q){
                    qId = q.id;
                    return;
                }
            })
        });

        return qId;
    }

    setCurrentPage(pageNumber: number) {
        this.currentPage = pageNumber;
    }

}
