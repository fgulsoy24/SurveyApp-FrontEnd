
import React, { Component } from 'react';

import * as Survey from "survey-react";
import "survey-react/survey.css";
import CommonFunctions from "./utils/CommonFunctions"
import SurveyActions from "./actions/SurveyActions"

class survey extends Component {
  constructor(props) {
    super(props);

  }
  onCompleting(survey){
    if(survey.valuesHash.Age < 18){
        survey.completedHtml= "Thank you for interest and helping BMW.";
    }
    else if(survey.valuesHash.FirstCar == "Yes"){
        survey.completedHtml= "We are targeting more experienced clients, thank you for your interest"
    }
}
  
sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    SurveyActions.sendResults(survey.data);
    //alert(resultAsString); //send Ajax request to your web server.
  }

 
surveyValidateQuestion(s, options) {
    if (options.name == 'UsedBmw1Model' || options.name == 'UsedBmw2Model'|| 
         options.name == 'UsedBmw3Model'|| options.name == 'UsedBmw4Model'||
         options.name == 'UsedBmw5Model'||options.name == 'UsedBmw6Model'||
         options.name == 'UsedBmw7Model'||options.name == 'UsedBmw8Model') {
        var name = options.value;
        var splittedName = name.split("");
        if(splittedName.length <= 5 && splittedName.length >= 2){
            if(splittedName.length == 5){
                if(splittedName[0].toUpperCase() == "M" && CommonFunctions.isNumberOrNot(splittedName[1])
                && CommonFunctions.isNumberOrNot(splittedName[2]) && CommonFunctions.isNumberOrNot(splittedName[3]) 
                && (splittedName[4].toUpperCase() == 'D' || splittedName[4].toUpperCase() == 'I'  ))
                {
                    return;
                }                
            }
            else if(splittedName.length == 4){
                if(splittedName[0].toUpperCase() == "M" && CommonFunctions.isNumberOrNot(splittedName[1])
                && CommonFunctions.isNumberOrNot(splittedName[2]) && CommonFunctions.isNumberOrNot(splittedName[3])){
                  
                    return;
                }
                else if(CommonFunctions.isNumberOrNot(splittedName[0])
                && CommonFunctions.isNumberOrNot(splittedName[1]) && CommonFunctions.isNumberOrNot(splittedName[2]) 
                && (splittedName[3].toUpperCase() == 'D' || splittedName[3].toUpperCase() == 'I' ))
                {                  
                    return;
                }
                else {
                    options.error = "Please check the model name'.";
                    return;
                }
                
            }
            else if(splittedName.length == 3){
                if(CommonFunctions.isNumberOrNot(splittedName[0])
                && CommonFunctions.isNumberOrNot(splittedName[1]) && CommonFunctions.isNumberOrNot(splittedName[2])){
                    return;
                }
            }
            else if(splittedName.length == 2){
                if((splittedName[0].toUpperCase() == 'Z' || splittedName[0].toUpperCase() == 'X' ) 
                && CommonFunctions.isNumberOrNot(splittedName[1]))
                {
                    return;
                }
                else{
                    options.error = "Please check the model name'.";
                    return;
                }
        }
    }
        else {
        options.error = "Please check the model name'."; 
    }
    
}
}

  render() {
    var style = {
        width: "60%",
    margin: "0 auto" 

      };
    Survey
    .StylesManager
    .applyTheme("default");
    var surveyJSON = { title: "BMW Survey",
    triggers: [
        {
            type: "complete",
            name: "Age",
            operator: "less",
            value: "18"
        },
        {
            type: "complete",
            name: "CarLicense",
            operator: "equal",
            value: "No, I prefer using other transport"
        },  {
            type: "complete",
            name: "FirstCar",
            operator: "equal",
            value: "Yes"
        }  
    ], pages: [
        
        { name:"page1", questions: [ 
            {
                type: "text",
                name: "Age",
                title: "Age",
                isRequired: true,
                collength: 2,
                "validators": [
                    {
                        "type": "expression",
                        "expression": "{Age} > 0 || 100 > {Age}",
                        "text": "Please correct the age. Age should be between 0 and 100."
                    },
                ]
            }
        ], 
        }, 
        { name: "page2", visibleIf: "{Age} >= 18" , questions: [
            
            { 
            type: "radiogroup",
            name: "Gender",
            title: "Gender",
            visibleIf: "{Age} >= 18", 
            isRequired: true,
            collength: 4,
            choices: [
                "Male",
                "Female",
                "Other"
            ]},
            { 
                type: "radiogroup",
                name: "CarLicense",
                title: "Do you own a car driving license?",
                visibleIf: "{Age} >= 18", 
                isRequired: true,
                collength: 4,
                choices: [
                    "Yes",
                    "No, I prefer using other transport"
                ]
            },
         ]
        },
        { name: "page3", visibleIf: "{Age} >= 18 and {Age} <= 25" , questions: [
            { 
                type: "radiogroup",
                name: "FirstCar",
                title: "Is this your first car?",
                isRequired: true,
                collength: 4,
                choices: [
                    "Yes",
                    "No"
                ]   
            }
        ],
      

        },
        { name: "page4",questions: [
          {  type: "radiogroup",
          name: "DriveTrain",
          title: "Which drivetrain do you prefer?",
          visibleIf: "{age} >= 18", 
          isRequired: true,
          collength: 4,
          choices: [
              "FWD",
              "RWD",
              "I don’t know"
          ]
        },
        {  type: "radiogroup",
        name: "Drifting",
        title: "Do you care about drifting?",
        visibleIf: "{age} >= 18", 
        isRequired: true,
        collength: 4,
        choices: [
            "Yes",
            "No"
        ]
      },
      {
        type: "dropdown",
        name: "UsedBmwCount",
        title: "How many BMWs did you drive?",
        isRequired: true,
        choices: [1, 2, 3 , 4, 5 ,6 ,7 ,8 ]
    },
    {
        name: "UsedBmw1Model",
        type: "text",
        visibleIf: "{UsedBmwCount} >= 1",
        isRequired: true,
        title: "The First Car Model"
    },
    {
        type: "text",
        name: "UsedBmw2Model",
        visibleIf: "{UsedBmwCount} >= 2",
        isRequired: true,
        startWithNewLine: false,
        title: "The Second Car Model"
    },  {
        type: "text",
        name: "UsedBmw3Model",
        visibleIf: "{UsedBmwCount} >= 3",
        isRequired: true,
        startWithNewLine: false,
        title: "The Third Car Model"
    },  {
        type: "text",
        name: "UsedBmw4Model",
        visibleIf: "{UsedBmwCount} >= 4",
        isRequired: true,
        startWithNewLine: false,
        title: "The Fourth Car Model"
    },  {
        type: "text",
        name: "UsedBmw5Model",
        visibleIf: "{UsedBmwCount} >= 5",
        isRequired: true,
        title: "The Fifth Car Model"
    },
    {
        type: "text",
        name: "UsedBmw6Model",
        visibleIf: "{UsedBmwCount} >= 6",
        isRequired: true,
        startWithNewLine: false,
        title: "The Sixth Car Model"
    },
    {
        type: "text",
        name: "UsedBmw7Model",
        visibleIf: "{UsedBmwCount} >= 7",
        isRequired: true,
        startWithNewLine: false,
        title: "The Seventh Car Model"
    },
    {
        type: "text",
        name: "UsedBmw8Model",
        visibleIf: "{UsedBmwCount} >= 8",
        isRequired: true,
        startWithNewLine: false,
        title: "The Eighth Car Model"
    },
    ] 
}
]  
}

    return (
      <div>
      <div  className="container" style={style} >
      <Survey.Survey json={surveyJSON} css={style} onValidateQuestion={this.surveyValidateQuestion} onComplete={this.sendDataToServer} onCompleting= {this.onCompleting}/>
      </div>
   </div>
    )
  }  
}

export default survey;