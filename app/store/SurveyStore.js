import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import SurveyConstants from '../constants/SurveyConstants';

const CHANGE_EVENT = 'change';

let _detailedResults = {
    ageSeries :[],
    ageLabels :[],
    carLicenseSeries:[],
    carLicenseLabels:[],
    firstCarSeries:[],
    firstCarLabels:[],
    targetableClientsSeries:[],
    targetableClientsLabels:[],
    avgUsedBmw:0,
    percentageDriveTrain:0,
    percentageDrifting:0,
    distSeries:[],
    distLabels:[]
};

let _interactionStatus = { listAcquiring: false, listAcquired: false, };


function setDetailedResults(results) {
    _detailedResults.ageSeries = results.results[0].series,
    _detailedResults.ageLabels = results.results[0].labels,
    _detailedResults.carLicenseSeries = results.results[1].series,
    _detailedResults.carLicenseLabels = results.results[1].labels,
    _detailedResults.firstCarSeries = results.results[2].series,
    _detailedResults.firstCarLabels = results.results[2].labels,
    _detailedResults.targetableClientsSeries = results.results[3].series,
    _detailedResults.targetableClientsLabels = results.results[3].labels,
    _detailedResults.avgUsedBmw = results.results[4];
    _detailedResults.percentageDriveTrain = results.results[5];
    _detailedResults.percentageDrifting = results.results[6];
    _detailedResults.distSeries = results.results[7].series,
    _detailedResults.distLabels = results.results[7].labels
}
function setSurveyReceivingStatus(newStatus) {
    _interactionStatus = newStatus;
}
class SurveyStoreClass extends EventEmitter {
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.listeners().forEach(function (listener) {
            listener.remove();
        });
    }
    getDetailedResults() {
        return _detailedResults;
    }
    getSurveyReceivingStatus(){
        return _interactionStatus
    }
}
const SurveyStore = new SurveyStoreClass();
SurveyStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.actionType) {
        case SurveyConstants.RECEIVING_RESULTS:
            setSurveyReceivingStatus({ listAcquiring: true, listAcquired: false });
            break;
        case SurveyConstants.RECEIVED_RESULTS:
            setSurveyReceivingStatus({ listAcquiring: false, listAcquired: true });
            setDetailedResults(action.results);
            SurveyStore.emitChange();
            break;
        case SurveyConstants.ERROR_RECEIVING_RESULTS:
            setSurveyReceivingStatus({ listAcquiring: false, listAcquired: false });
            SurveyStore.emitChange();
            break;
    }
})
export default SurveyStore;