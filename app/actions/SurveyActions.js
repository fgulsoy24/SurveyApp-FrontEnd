import SurveyAPI from "../utils/SurveyAPI";
import AppDispatcher from '../dispatcher/AppDispatcher';
import SurveyConstants from "../constants/SurveyConstants";

export default {

sendResults: (params) => {
    AppDispatcher.dispatch({
     // actionType: HoldoutConstants.CREATING_HOLDOUT,
      params: params
    });

    SurveyAPI
      .sendResults(params)
      .then(result => AppDispatcher.dispatch({
        //  actionType: HoldoutConstants.CREATED_HOLDOUT,
          result: result
        }),
        failure => AppDispatcher.dispatch({
          //actionType: HoldoutConstants.ERROR_CREATING_HOLDOUT,
        }) 
      );
  },
  getDetailedResults: (params) => {
    AppDispatcher.dispatch({
      actionType: SurveyConstants.RECEIVING_RESULTS,
      params: params
    });
    
    SurveyAPI
    .getDetailedResults()
    .then(
        results => {
            AppDispatcher.dispatch({
                actionType: SurveyConstants.RECEIVED_RESULTS,
                results: results
            });
        },
        failure => AppDispatcher.dispatch({
          actionType: SurveyConstants.ERROR_RECEIVING_RESULTS,
        }) 
     );
},
}