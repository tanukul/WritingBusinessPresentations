var _Module = (function () {
    var _sessionData = {}
    var _attempt = {
        status: AttemptStatus.new,
        bookmarkData: {},      
    }
    function save_session_data(_param_status) {
        //ATUL _param_status = complete/inprogress
        var lastAttIndex = _sessionData.attempts.length - 1;
        _sessionData.attempts[lastAttIndex].status = _param_status;
        _sessionData.attempts[lastAttIndex].bookmarkData = _Navigator.getBookmarkData();
        _EconLabServiceManager.SaveSessionData(_sessionData);
    }
    return {
        GetSessionData: function () {
            return _sessionData;
        },
        Init: function () {
            _EconLabServiceManager.InitLaunch();
            _EconLabServiceManager.InitSettings();
            _sessionData = _EconLabServiceManager.GetSessionData()
            _KnowdlServiceManager.InitLaunch(_EconLabServiceManager.GetLaunchData());
            //Init Session Data
            if ((typeof _sessionData == "undefined") || (typeof _sessionData == "string" && $.trim(_sessionData) == "")) {
                _sessionData.attempts = [];
                _sessionData.attempts.push(_attempt)
            } else if (typeof _sessionData == "string") {
                _sessionData = JSON.parse(_sessionData);
                if (_sessionData.attempts == undefined || _sessionData.attempts.length <= 0) {
                    _sessionData.attempts = [];
                    _sessionData.attempts.push(_attempt)
                }
            } else if (_Common.IsEmptyObject(_sessionData)) {
                _sessionData.attempts = [];
                _sessionData.attempts.push(_attempt)
            } else {
                var lastAttIndex = _sessionData.attempts.length - 1
                
                //ATUL No need this funtion for FOM sim modules _KnowdlServiceManager.InitBookmarking(_sessionData.attempts[lastAttIndex].k_bookmarkData)

                _Navigator.setBookmarkData(_sessionData.attempts[lastAttIndex].bookmarkData)
            }
            
            var tempLaunchData = _EconLabServiceManager.GetLaunchData();
            var templastAttIndex = _sessionData.attempts.length - 1
            if(tempLaunchData.Student_Id != "" && tempLaunchData.Student_Id != undefined && tempLaunchData.Mode == 'do' && _sessionData.attempts[templastAttIndex].status != 'complete'){
                _KnowdlServiceManager.PostLaunchData();
            }
            /*
            if (_Settings.enableCache) {
                _Caching.InitAssetsCaching();
                _Caching.InitPageCaching();
            }*/
        },
        SaveSessionData: function () {
            if(!_Navigator.IsXL()){
                return;
            }
            if (_sessionData.attempts[_sessionData.attempts.length - 1].status == AttemptStatus.complete) {
                save_session_data(AttemptStatus.complete);
            } else {
                save_session_data(AttemptStatus.inprogress);
            }
        },
        PostFinalGrade: function () {
            var userPercScore = _Navigator.GetUserScore().userScorePerc;
            var totalPoints = userPercScore / 100;
            var duration = _Navigator.GetTotalDuration();
            var lastAttIndex = _sessionData.attempts.length - 1;
            var localMaxScore = _sessionData.attempts[lastAttIndex].maxScore;
            if(localMaxScore == undefined){
                _sessionData.attempts[lastAttIndex].maxScore = -1;
                localMaxScore = -1;
            }
            var localScoreDiff = -1;
            if (_sessionData.attempts[_sessionData.attempts.length - 1].status != AttemptStatus.complete) {

                if (localMaxScore == -1) {
                    localScoreDiff = userPercScore
                }
                else {
                    if (userPercScore > localMaxScore) {
                        localScoreDiff = userPercScore - localMaxScore;
                    }
                }
                if (localScoreDiff >= 0) {
                    _EconLabServiceManager.PostFinalGrade(totalPoints, duration);
                    _sessionData.attempts[lastAttIndex].maxScore = userPercScore
                }
            }
            var classAverage = _EconLabServiceManager.UpdateAndGetClassAverage(localMaxScore, localScoreDiff);
            _Navigator.UpdateClassAverage(classAverage);
            save_session_data(AttemptStatus.complete);
        },
        GetObjectiveDefinition: function () {
            var objective = undefined;
            var ObjectiveDefinitions = _ObjectiveManager.GetObjective();
            var tempTargetId = _EconLabServiceManager.GetLaunchData().TargetId;
            for (var i = 0; i < ObjectiveDefinitions.length; i++) {
                //Commented for now to run locally            
                if (ObjectiveDefinitions[i].CustomTarget == tempTargetId) {
                    objective = ObjectiveDefinitions[i];
                    break;
                }
            }
            if(objective==undefined){
                objective = ObjectiveDefinitions[3];
            }
            return objective;
        },

    };
})();
var menubutton;
$(document).ready(function () {
    window.resizeTo(screen.width, screen.height);
    
    if (_Navigator.IsRevel()) {
        $('head').append('<script src="scripts/session.js"></script>');
        $('head').append('<script src="scripts/revel.js"></script>');
    }
    if (_Navigator.IsXL()) {
        var arr = window.location.href.split("/");
        _EconLabServiceManager.SetSessionId(arr[arr.length - 2]);

        _Module.Init();
        var bookmarkdata = _Navigator.getBookmarkData();
        var jsonObj = {};
        if (!_Common.IsEmptyObject(bookmarkdata) && bookmarkdata.lastVisitedPageID != undefined) {
            jsonObj.isBookMark = true;
            jsonObj.bookmarkdata = bookmarkdata;
        }
        _Navigator.Start(jsonObj);        
    }
    else{
        _Navigator.Start();
    }
    menubutton = new Menubutton(document.getElementById('appmenu'));
    menubutton.init();
    //_Navigator.Start();
});