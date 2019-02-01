var _KnowdlServiceManager = (function () {
    var _data = {}
    _data.CompletionStatus = "Inprogress";
        var _globals = {}

        //var _knowdlPostUrl = "http://dev.knowdl.com/qlinteraction/process";
        var _knowdlPostUrl = "https://stage1.knowdl.com/qlinteraction/process"
        //var _knowdlPostUrl = "http://localhost:59541/qlinteraction/process"

        var _questionstarttime = new Date();
        var _classAverage = 0;
        var _MQAdditionalInfo = [{ QId: 488, Info: { OptionAlignment: "H" } }]
        var QL_Settings = { IsQualsim: true, CA_Dial_Off_SR: false }
    return {
            /*get_Settings: function () {
                return QL_Settings;
            },
            set_Settings: function (setObj) {
                if (setObj.IsQualsim) {
                    QL_Settings = setObj;
                }
            },*/
        GetGlobalsData: function(){
            return _globals;
        },    
        InitLaunch: function (_ldata, skipInit) {
                _globals.QL_Id = _ldata.TargetId;
                _globals.QLTitle = _ldata.TargetTitle;
                _globals.Assignment_Id = _ldata.ResourceId;
                _globals.AssignmentLocation = window.location.hostname;
                _globals.AssignmentTitle =_ldata.ResourceTitle;
                _globals.Student_Id = _ldata.Student_Id
                _globals.Session_Id = _ldata.SessionId;
                _globals.StudentName = _ldata.StudentFirstName + " " + _ldata.StudentLastName;
                _globals.Role = _ldata.Roles
                _globals.NumberOfAttempts = _ldata.AllowedAttempts;
                _globals.TargetPoints = _ldata.TargetPoints;                
                _globals.Mode = _ldata.Mode;
                _globals.ObjectiveDetails = _Module.GetObjectiveDefinition();

                //this.PostLaunchData();
        },
        
        SetCompletion: function () {
            if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                _data.QDetails = {};
                _data.CompletionStatus = "Complete";
                this.PostData(false);
            }
        },     
        PostLaunchData: function (p_async) {
            var _async = true;
            if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                if (p_async != undefined && p_async == false) {
                    _async = false;
                }
                var jsonSerialized = JSON.stringify(_globals);
                //replace special characters.
                jsonSerialized = jsonSerialized.replace(/[^a-zA-Z ',"<>!~@#$%&*.+-=|\?()\[\]_{}\\ ]/g, "");
                var servcUrl = _knowdlPostUrl + "?command=launch";
                $.ajax({
                    type: "POST",
                    async: _async,
                    url: servcUrl,
                    data: {
                        jsondata: jsonSerialized
                    },
                    success: function (result) {
                        //Data posted successfully
                    },
                    error: function (error) {

                    }
                });
            }
        },
       
            PostQuestionData: function (qObj) {
                if(!_Navigator.IsXL()){
                    return;
                }
                //this method is called in UpdateAttemptMaxScore->UpdateUserAttempts to post question data
                //Need to call on pages where UpdateAttemptMaxScore is not called.
                if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                    QDetails = {};
                    if (qObj != undefined && qObj != null) {
                        QDetails.QId = qObj.QId;
                        QDetails.PId = qObj.PId;
                        QDetails.QText = qObj.QText;
                        QDetails.QOptions = qObj.QOptions;
                        QDetails.QSelOptionId = qObj.QSelOptionId;
                        QDetails.QTotal = qObj.QTotal;
                        QDetails.QPoints = qObj.QPoints;
                        QDetails.QCorrectStatus = qObj.QCorrectStatus;
                        QDetails.QTitle = qObj.QTitle;
/*ATUL
                        var tempQTitle = this.GetQTitleFromMenu(qObj.PId);
                        if (tempQTitle != undefined && tempQTitle != "") {
                            QDetails.QTitle = tempQTitle;
                        }*/

                        if (QDetails.QTotal == undefined) {
                            QDetails.QTotal = 1;
                        }

                        QDetails.QScore = (Number(QDetails.QPoints) / Number(QDetails.QTotal)) * 100;
                        if (QDetails.QScore == undefined || QDetails.QScore == null) {
                            QDetails.QScore = 0;
                            QDetails.QPoints = 0;
                        } else {
                            QDetails.QScore = Number(Number(QDetails.QScore).toFixed(2));
                        }
                        /*ATUL
                        QDetails.MQAdditionalInfo = this.GetMQAdditionalInfo(qObj.QId);
                        QDetails.AdditionalInfo = qObj.AdditionalInfo;*/
                    }
                    _data.QDetails = QDetails;

                    //Qtimespent is calculated in post data.
                    this.PostData();
                }
            },
            
            RetryAttempt: function () {
                if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                    _data.QDetails = {};
                    _data.CompletionStatus = "inprogress";
                    var _ldata = _EconLabServiceManager.GetLaunchData();
                    this.InitLaunch(_ldata);
                    this.PostData();
                }
            },
           
            //New
            PostData: function (p_async) {
                var _async = true;
                if (_globals.Mode.trim().toLowerCase() == LaunchModes.do) {
                    if (p_async != undefined && p_async == false) {
                        _async = false;
                    }
                    _data.QL_Id = _globals.QL_Id;
                    _data.Assignment_Id = _globals.Assignment_Id;
                    _data.Student_Id = _globals.Student_Id;
                    _data.AssignmentLocation = _globals.AssignmentLocation;

                    var currTime = new Date();

                    if (_data.QDetails != undefined) {
                        if (_data.QDetails.QId != undefined) {
                            _data.QDetails.QTimeSpent = parseInt((currTime.getTime() - _questionstarttime.getTime()) / 1000);
                        }
                    }

                    //Reset level start time 
                    _questionstarttime = currTime;

                    _data.OverallTimeSpent = parseInt((new Date().getTime() - _startTime.getTime()) / 1000) + _Navigator.GetTotalDuration();
                    //ATUL
                    //_data.OverallScore = QLSimModule.GetTotalScore();
                    _data.OverallScore = _Navigator.GetUserScore().userScorePerc;

                    //ATUL
                    //overall points needs to be calculated.
                    //_data.OverallPoints = QLSimModule.GetUserScore();
                    _data.OverallPoints = _Navigator.GetUserScore().userScorePerc / 10;
                    //end                

                    var jsonSerialized = JSON.stringify(_data);
                    //replace special characters.
                    //jsonSerialized = jsonSerialized.replace(/[^a-zA-Z ',"<>!~@#$%&*.+-=|\?()\[\]_{}\\ ]/g, "").replace(/&/g, '%26');
                    var servcUrl = _knowdlPostUrl + "?command=updateattemptdata";
                    $.ajax({
                        type: "POST",
                        async: true,
                        url: servcUrl,
                        data: { jsondata: jsonSerialized },
                        success: function (result) {
                            //Data posted successfully
                        },
                        error: function (error) {

                        }
                    });

                    //reset Q Details
                    _data.QDetails = {}
                }
            }

    };
})();


var _EconLabServiceManager = (function () {
    var _serviceurl = window.location.origin + "/econservice";
    var _settingsData = JSON.parse('{}');
    var _launchData = {
        SessionId: '',
        Student_Id: '',      
        StudentFirstName:'',
        StudentLastName:'',
        Mode: 'do',
        Roles: '',
        CurrentQuestion: '',
        TargetId: '',
        TargetTitle:'',
        ResourceId: '',
        ResourceTitle:'',
        TargetPoints: 1,
        AllowedAttempts: 0
    }
      
    var _sessionState = {}
    //Private functions
    function _grade_problem_and_report(_data) {
        if (_launchData.Mode.trim().toLowerCase() == LaunchModes.do) {
            var jsonSerialized = JSON.stringify(_data);
            var servcUrl = _serviceurl + "/gldata/grade_problem_and_report/" + _launchData.SessionId + "/" + _launchData.TargetId + "/";
            $.ajax({
                type: "POST",
                url: servcUrl,
                data: jsonSerialized,
                success: function (result) {
                    console.log("post grade success")
                },
                error: function (error) {
                    console.log("post grade failed: error - - status:" + error.status + " statusText:" + error.statusText)
                }
            });
        }
    }
    function _get_settings() {        
        var obj = {};
        obj.knowdlresourceid = _launchData.ResourceId;
        obj.knowdltargetapp = _launchData.TargetId;

        var jsonSerialized = JSON.stringify(obj);
        var servcUrl = _serviceurl + "/data/econ/inflation/getInflationSettings/";
        $.ajax({
            type: "POST",
            url: servcUrl,
            async: false,
            data: jsonSerialized,
            success: function (result) {
                console.log("get settings success")   
                _EconLabServiceManager.GetSettingsSuccessCallback(result);                
            },
            error: function (error) {
                console.log("get settings failed: error - status:" + error.status + " statusText:" + error.statusText);
            }
        });        
    }    
    function _get_session_data() {
        var servcUrl = _serviceurl + "/gldata/get_session_data/" + _launchData.SessionId + "/";
        $.ajax({
            type: "GET",
            url: servcUrl,
            dataType: "json",
            async: false,
            cache: false,
            success: function (result) {
                console.log("get session data success")
                _EconLabServiceManager.GetSessionDataSuccessCallback(result)                                
            },
            error: function (error) {
                console.log("get session data failed: error - status:" + error.status + " statusText:" + error.statusText);
            }
        });
    }
    function _put_session_state_data(_data) {
        if (_launchData.Mode.trim().toLowerCase() == LaunchModes.do) {
            var jsonSerialized = JSON.stringify(_data);
            //replace special characters.
            jsonSerialized = jsonSerialized.replace(/[^a-zA-Z ',"<>!~@#$%&*.+-=|\?()\[\]_{}\\ ]/g, "");
            var servcUrl = _serviceurl + "/gldata/put_session_state_data/" + _launchData.SessionId + "/";
            $.ajax({
                type: "POST",
                url: servcUrl,
                data: jsonSerialized,
                success: function (result) {
                    console.log("post session data success")
                },
                error: function (error) {
                    console.log("post session data failed: error- status:" + error.status + " statusText:" + error.statusText);
                }
            });
        }
    }  
    function _get_class_average(maxscore, score) {
        var _classAverage = 0; 
        var servcUrl = _serviceurl + "/data/econ/common_services/get_class_average/?qlid=" + _launchData.TargetId + "&asgnid=" + _launchData.ResourceId + "&maxscore=" + maxscore + "&score=" + score;
        $.ajax({
            type: "GET",
            async: false,
            url: servcUrl,
            success: function (result) {
                if (result != undefined && $.trim(result) != "") {
                    _classAverage = Number(result);
                }
            },
            error: function (error) {
                _classAverage = 0;
            }
        });

        return _classAverage;
    }
    //end Private Functions

    return {        
        InitLaunch: function () {
            _get_session_data();
        },
        InitSettings: function(){
            _get_settings();
        },   
        SetSessionId: function(sid) {
            _launchData.SessionId = sid;
        },
        //NM Callback functions are applicable inside json call success callback only
        //NM Even if this function are public, using outside the Object has no meaning.
        //NM R&D: We can check for declaring it as private and accessible inside object only.
        GetSessionDataSuccessCallback: function(_data){
            if(typeof _data != "undefined"){
                if(typeof _data == "string" && $.trim(_data)!=""){
                    _data = JSON.parse(_data);
                }
                if(_data.launch_data!=undefined){
                    //Init Launch Data  
                    _launchData.Student_Id  = _data.launch_data.user_id            
                    _launchData.StudentFirstName = _data.launch_data.custom_firstname;
                    _launchData.StudentLastName = _data.launch_data.custom_lastname;
                    _launchData.Mode = _data.launch_data.custom_mode;
                    _launchData.Roles = _data.launch_data.roles;          
                    _launchData.CurrentQuestion = _data.launch_data.custom_currentquestion;            
                    _launchData.ResourceId = _data.launch_data.custom_resource_id;
                    _launchData.ResourceTitle = _data.launch_data.custom_assignmenttitle;
                    _launchData.AllowedAttempts = _data.launch_data.custom_attemptsallowed;
                    _launchData.TargetId = _data.launch_data['custom_target_' + _data.launch_data.custom_currentquestion];
                    _launchData.TargetTitle = _data.launch_data['custom_questiontitle_' + _data.launch_data.custom_currentquestion];
                    _launchData.TargetPoints = _data.launch_data['custom_points_' + _data.launch_data.custom_currentquestion];
                    _sessionState = _data.session_state;
                    //ATUL
                    gAllowedAttempts = (_data.launch_data.custom_attemptsallowed) - 1;                    
                }
            }
        },
        //NM Callback functions are applicable inside json call success callback only
        //NM Even if this function are public, using outside the Object has no meaning.
        //NM R&D: We can check for declaring it as private and accessible inside object only.
        GetSettingsSuccessCallback: function(_data){
            if(typeof _data != "undefined"){
                if(typeof _data == "string" && $.trim(_data)!=""){
                    _data = JSON.parse(_data);
                }
                _settingsData = _data;
            }
        },        
        SaveSessionData: function(_data){            
            if (_launchData.Mode.trim().toLowerCase() == LaunchModes.do) {  
                _put_session_state_data(_data); 
            }
        },
        PostFinalGrade: function (_p_totalPoints,_p_duration) {
            if (_launchData.Mode.trim().toLowerCase() == LaunchModes.do) {  
                var studentdata = {};
                studentdata.score = (Number(_p_totalPoints) * Number(_launchData.TargetPoints)).toFixed(2);
                studentdata.duration = Number(_p_duration);
                studentdata.submissionCount = 1;
                studentdata.nAttempts = 1;
                studentdata.answers = "1";
                studentdata.problemNumber = _launchData.CurrentQuestion;
                _grade_problem_and_report(studentdata);
            }
        },
        UpdateAndGetClassAverage: function(maxscore, scorediff){
            _classAverage = _get_class_average(maxscore, scorediff)
            return _classAverage;
        },
        get_Url: function () {
            return _serviceurl;
        },
        GetSettings: function () {
            return _settingsData;
        },
        GetLaunchData: function () {
            return _launchData;
        },
        GetSessionData: function () {
            return _sessionState;
        }
    }
})();