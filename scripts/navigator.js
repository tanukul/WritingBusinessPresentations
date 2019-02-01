//This api will contain navigation logic and page load.
//It will also handle the question navigation if the page is having multiple questions.
var _startTime = new Date();
var transcriptIDs = [];
var gVisitedPages = {};
var gCommonData = '';
var gRandomData = [];
var gRevelClientId = 'sbJAZQpiO3PzgIValHFA59TKBzpzcg8p';
var gRefURL = 'https://revel.pearson.com/';
var packageType = "";//presenter/scorm/revel/XL
var _lastDuration = 0;

var gSessionId = ""
var gProbNumber = -1;
var gTAUserName = ""
var gAllowedAttempts = 0;
var gStudentScore = 0;
var currentAttempt = 0;
var prevPgId = undefined;

var _Navigator = (function () {
    var _currentPageId = "";
    var _currentPageObject = {};
    var _NData = {

        "l1p1": {
            pageId: "l1p1",
            prevPageId: "",
            nextPageId: "l1p2",
            dataurl: "intro_s1.htm",
            isShowInMenu: true,
            isStartPage: true,
            options: [{
                NextPgId: "l1p2"
            }]
        },        
        "l1p2": {
            pageId: "l1p2",
            prevPageId: "l1p1",
            nextPageId: "",
            dataurl: "page2_q1.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            isCustomNext: true,
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p3'
            },
            {
                NextPgId: 'l1p4'
            },
            {
                NextPgId: 'l1p5'
            }]
        },
        "l1p3": {
            pageId: "l1p3",
            prevPageId: "l1p2",
            nextPageId: "l1p6",
            dataurl: "page3_q2a.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
           
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p6'
            }]
        },
        "l1p4": {
            pageId: "l1p4",
            prevPageId: "l1p2",
            nextPageId: "l1p7",
            dataurl: "page4_q2b.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
           
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p7'
            }]
        },
        "l1p5": {
            pageId: "l1p5",
            prevPageId: "l1p2",
            nextPageId: "l1p7",
            dataurl: "page5_q2c.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
           
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p7'
            }]
        },
        "l1p6": {
            pageId: "l1p6",
            prevPageId: "l1p3",
            nextPageId: "l1p8",
            isShowInMenu: true,
            dataurl: "page6_m1.htm",
            options: [{
                NextPgId: "l1p8"
            }]
        },
        "l1p7": {
            pageId: "l1p7",
            prevPageId: "l1p4",
            nextPageId: "l1p9",
            isShowInMenu: true,
            dataurl: "page7_m2.htm",
            options: [{
                NextPgId: "l1p9"
            }]
        },
        "l1p8": {
            pageId: "l1p8",
            prevPageId: "l1p6",
            nextPageId: "l1p10",
            dataurl: "page8_q3a.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p10'
            }]
        },
        "l1p9": {
            pageId: "l1p9",
            prevPageId: "l1p7",
            nextPageId: "l1p11",
            dataurl: "page9_q3b.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 2,
            options: [{
                NextPgId: 'l1p11'
            }]
        },        
        "l1p10": {
            pageId: "l1p10",
            prevPageId: "l1p8",
            nextPageId: "",
            dataurl: "page10_q4a.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            isCustomNext: true,
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 3,
            options: [{
                NextPgId: 'l1p12'
            },
            {
                NextPgId: 'l1p13'
            }
        ]
        },
        "l1p11": {
            pageId: "l1p11",
            prevPageId: "l1p10",
            nextPageId: "",
            dataurl: "page11_q4b.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            isCustomNext: true,
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 3,
            options: [{
                NextPgId: 'l1p14'
            },
            {
                NextPgId: 'l1p15'
            }]
        },       
        
        "l1p12": {
            pageId: "l1p12",
            prevPageId: "l1p10",
            nextPageId: "l1p16",
            dataurl: "page12_q5a.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 11,
            options: [{
                NextPgId: 'l1p16'
            }]

        },
        "l1p13": {
            pageId: "l1p13",
            prevPageId: "l1p10",
            nextPageId: "l1p17",
            dataurl: "page13_q5b.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 11,
            options: [{
                NextPgId: 'l1p17'
            }]

        },
        "l1p14": {
            pageId: "l1p14",
            prevPageId: "l1p11",
            nextPageId: "l1p18",
            dataurl: "page14_q5c.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
           
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p18'
            }]
        },
        "l1p15": {
            pageId: "l1p15",
            prevPageId: "l1p11",
            nextPageId: "l1p19",
            dataurl: "page15_q5d.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p19'
            }]
        },
        "l1p16": {
            pageId: "l1p16",
            prevPageId: "l1p12",
            nextPageId: "l1p20",
            dataurl: "page16_q6a.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p20'
            }]
        },
        "l1p17": {
            pageId: "l1p17",
            prevPageId: "l1p13",
            nextPageId: "l1p21",
            dataurl: "page17_q6b.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p21'
            }]
        },
        "l1p18": {
            pageId: "l1p18",
            prevPageId: "l1p14",
            nextPageId: "l1p22",
            dataurl: "page18_q6c.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p22'
            }]
        },
        "l1p19": {
            pageId: "l1p19",
            prevPageId: "l1p15",
            nextPageId: "l1p23",
            dataurl: "page19_q6d.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p23'
            }]
        },
        "l1p20": {
            pageId: "l1p20",
            prevPageId: "l1p16",
            nextPageId: "l1p24",
            dataurl: "page20_q7a.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p24'
            }]
        },
        "l1p21": {
            pageId: "l1p21",
            prevPageId: "l1p17",
            nextPageId: "l1p24",
            dataurl: "page21_q7b.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p24'
            }]
        },
        "l1p22": {
            pageId: "l1p22",
            prevPageId: "l1p18",
            nextPageId: "l1p24",
            dataurl: "page22_q7c.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
         
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p24'
            }]
        },
        "l1p23": {
            pageId: "l1p23",
            prevPageId: "l1p19",
            nextPageId: "l1p24",
            dataurl: "page23_q7d.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
           
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p24'
            }]
        },
        "l1p24": {
            pageId: "l1p24",
            prevPageId: "l1p23",
            nextPageId: "l1p61",
            dataurl: "page24_q8.htm",
            questions: [],
            isDecisionPage: true,
            isQuestion: true,
            isQuestionAttempted: false,
            
            isRandomOpt: false,
            maxScore: 5,
            QuestionType: "radio",
            questionId: 21,
            options: [{
                NextPgId: 'l1p61'
            }]
        },  
        "l1p61": {
            pageId: "l1p61",
            prevPageId: "l1p59",
            nextPageId: "",
            dataurl: "result.htm",
            isShowInMenu: true,
            isLastPage: true,
            options: [{
                NextPgId: null
            }]
        }
    }
    var _StateData = {};

    function OnPageLoad() {
        $("#infoDetails").hide();
        $("#transcriptDetails").hide();
        var currPage = _Navigator.GetCurrentPage();
        $(".pagedesc").find("br").each(function () {
            $(this).attr("aria-hidden", "true")
        })
        if (currPage.isLastPage) {
            var pageHeading = $(".main-content").find(".resultTitle").text();
        }
        else {
            var pageHeading = $(".main-content").find(".pageheading").text();
        }

        //Remove 0 width character code
        /*var regex = /(^[\s\u200b]*|[\s\u200b]*$)/gi;
        $('.main-content').html(function (i, oldHTML) {
            return oldHTML.replace(regex, ' ')
                .replace(/[^\x00-\x7F]|\?/g, '');
        });*/
        currPage.PageTitle = pageHeading;
        var visitedPageObj = _Navigator.GetVisitedPage(currPage.pageId)
        visitedPageObj.PageTitle = pageHeading;
        visitedPageObj.prevPageId = currPage.prevPageId;
        if (currPage.isLastPage != undefined && currPage.isLastPage && _Navigator.IsXL()) {           
            var temp_sessionData = _Module.GetSessionData();
            var tempLaunchData = _EconLabServiceManager.GetLaunchData();
            var templastAttIndex = temp_sessionData.attempts.length - 1
            if (tempLaunchData.Student_Id != "" && tempLaunchData.Student_Id != undefined && tempLaunchData.Mode == 'do' && temp_sessionData.attempts[templastAttIndex].status != 'complete') {
                _KnowdlServiceManager.SetCompletion();
            }
            _Module.PostFinalGrade();
        }
        if(currPage.isLastPage != undefined && currPage.isLastPage && !_Navigator.IsXL()){
            var classAverage = _Navigator.GetUserScore().userScorePerc;
            _Navigator.UpdateClassAverage(classAverage);
        }
        _Module.SaveSessionData();
        
    }

    return {
        Get: function () {
            return _NData;
        },
        Set: function (_bkNdata) {
            _NData = _bkNdata;
        },
        GetAttemptNumber: function () {
            return currentAttempt;
        },
        IncreamentAttempt: function () {
            currentAttempt++;
        },
        getBookmarkData: function () {
            var currPage = _Navigator.GetCurrentPage();
            var bkobj = {}
            bkobj.gStudentScore = gStudentScore;
            bkobj.currentAttempt = currentAttempt;
            bkobj.gVisitedPages = gVisitedPages;
            bkobj.lastVisitedPageID = currPage.pageId;
            bkobj.duration = this.GetTotalDuration();
            return bkobj;
        },
        setBookmarkData: function (bkobj) {
            gStudentScore = bkobj.gStudentScore
            currentAttempt = bkobj.currentAttempt;
            if (bkobj.gVisitedPages != undefined) {
                gVisitedPages = bkobj.gVisitedPages;
                //update _Ndata
                for (var j in gVisitedPages) {
                    _NData[j].isVisited = true;
                    _NData[j].IsComplete = true;
                    _NData[j].isMenuVisited = true;
                    _NData[j].PageTitle = gVisitedPages[j].PageTitle;
                    _NData[j].prevPageId = gVisitedPages[j].prevPageId;
                    if (gVisitedPages[j].StudSelOption != undefined) {
                        _NData[j].StudSelOption = gVisitedPages[j].StudSelOption;
                        _NData[j].isQuestionAttempted = gVisitedPages[j].isQuestionAttempted;
                        _NData[j].userScore = gVisitedPages[j].userScore;
                    }
                    if (gVisitedPages[j].questions != undefined) {
                        _NData[j].questions = gVisitedPages[j].questions;
                        _NData[j].isQuestionAttempted = gVisitedPages[j].isQuestionAttempted;
                        _NData[j].CorrectSequence = gVisitedPages[j].CorrectSequence;
                        _NData[j].isCurrent = gVisitedPages[j].isCurrent;
                        _NData[j].isAnswered = gVisitedPages[j].isAnswered;
                        _NData[j].userScore = gVisitedPages[j].userScore;
                    }
                }
            }
            _currentPageObject = _NData[bkobj.lastVisitedPageID];
            if (bkobj.duration != undefined) {
                _lastDuration = parseInt(bkobj.duration);
            }
        },
        Start: function (jsonObj) {
            var Dataurl = $.url('?page');
            if (Dataurl == "" || Dataurl == undefined) {
                this.LoadPage("l1p1", jsonObj);
                isPrev = false;
            } else {
                this.LoadPage(Dataurl);
            }
        },
        GetgVisitedPages: function () {
            return gVisitedPages;
        },
        GetVisitedPage: function (pageId) {
            if (gVisitedPages[pageId] == undefined) {
                gVisitedPages[pageId] = {}
            }
            return gVisitedPages[pageId];
        },
        LoadPage: function (pageId, jsonObj) {
            _currentPageId = pageId;
            if (!_Common.IsEmptyObject(jsonObj) && jsonObj != undefined) {
                if (jsonObj.isBookMark) {
                    _currentPageId = jsonObj.bookmarkdata.lastVisitedPageID;
                }
                else if (jsonObj.isMenuVisit) {
                    _currentPageId = jsonObj.pageId;
                }
            }
            _currentPageObject = _NData[_currentPageId];

            if (transcriptIDs.length == 0) {
                transcriptIDs.push(_currentPageObject.pageId);
            } else {
                var isAdded = false;
                $.each(transcriptIDs, function (key, value) {
                    if (value == _currentPageObject.pageId) {
                        isAdded = true;
                    }
                });
                if (!isAdded) {
                    transcriptIDs.push(_currentPageObject.pageId);
                }
            }

            if (_currentPageObject.IsComplete == undefined || !_currentPageObject.IsComplete) {
                if (_currentPageObject.pageId != "l1p1") {
                    this.CompletePage()
                }
            }
            if (!gVisitedPages[_currentPageObject.pageId]) {
                for (var j in gVisitedPages) {
                    gVisitedPages[j].isLastPageVisite = false;
                }
                gVisitedPages[_currentPageObject.pageId] = {
                    isVisited: true,
                    IsComplete: true,
                    isLastPageVisite: true
                };
            }
            this.UpdateProgressBar();

            $("#linkprevious").k_enable();
            $("#linknext").k_enable();
            $('html,body').css({ scrollTop: 0 })
            if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
                $("#linkprevious").k_disable();
                $("#linknext").k_enable();
            }
            if (_currentPageObject.isLastPage != undefined && _currentPageObject.isLastPage) {
                $("#linknext").k_disable();
            }
            _currentPageObject.isVisited = true;
            if (prevPgId != undefined && prevPgId != '') {
                _currentPageObject.prevPageId = prevPgId;
                prevPgId = '';
            }
            var pageUrl = _Settings.dataRoot + _currentPageObject.dataurl + _Caching.GetUrlExtension();;
            if (_currentPageObject.isStartPage) {
                $(".main-content").load(pageUrl, function () {
                    OnPageLoad();
                    $("#titleheader").focus();
                    _Navigator.AddMenuList(_currentPageId);
                });
            }
            else if (_currentPageObject.isLastPage) {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        OnPageLoad();
                        $("h2.pageheading").focus();
                        _Navigator.AddMenuList(_currentPageId);
                        _Navigator.LoadSummaryPage();
                        SubmitQuestionScore();
                        updateLearningObjectives(true);
                        _Navigator.checkRetryButton();
                        $("#linknext").k_disable();
                    });
                });
            }
            else {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        OnPageLoad();
                        $("#progressInnrDiv").focus();
                        if (_currentPageObject.isQuestion == true) {
                            _Navigator.initializeFdkdiv();
                        } else if (_currentPageObject.isCustomQuestion == true) {
                            _Navigator.initializeCustomFdkdiv();
                        }
                        _Navigator.AddMenuList(_currentPageId);
                    });
                });
            }
        },
        Prev: function () {
            isPrev = true;
            this.LoadPage(_currentPageObject.prevPageId);
        },
        Next: function () {
            isPrev = false;
            $("#linkprevious").k_enable();
            prevPgId = _currentPageObject.pageId;
            if (_currentPageObject.isCustomNext != undefined && _currentPageObject.isCustomNext) {
                if (_currentPageObject.nextPageId == '') {
                    var _nxtPgID = _Navigator.GetRandomPageId();
                    _currentPageObject.nextPageId = _nxtPgID;
                    this.LoadPage(_nxtPgID);
                } else {
                    this.LoadPage(_currentPageObject.nextPageId);
                }
            }
            else {
                this.LoadPage(_currentPageObject.nextPageId);
            }
        },
        GetProgressData: function () {
            var progData = [];
            var visitpage = 0;
            for (var i in _NData) {
                if (_NData[i].IsComplete) {
                    visitpage++;
                }
            }
            progData.push(visitpage);
            return visitpage;
        },
        UpdateProgressBar: function () {
            var lastpage = "l1p1";
            for (var pageId in gVisitedPages) {
                if (gVisitedPages[pageId].isLastPageVisite) {
                    lastpage = pageId;
                }
            }
            var TotalLength = _Navigator.LongestPath(_Navigator.Get(), _Navigator.Get()[lastpage]).TotalLength;
            var progData = this.GetProgressData();
            var lprog_pecent = (progData / ((TotalLength + progData) - 1) * 100).toFixed(2);
            $(".progressForeground.ProgressForeGroundColor").css("width", lprog_pecent + "%");
            $("#progressInnrDiv").text("Progress " + Math.round(lprog_pecent) + "%");
            if (lprog_pecent == 100) {
                $(".progressForeground.ProgressForeGroundColor").css("width", "100%");
                $("#progressInnrDiv").text("Progress 100%");
            }
        },
        GetCurrentPage: function () {
            return _currentPageObject;
        },
        CompletePage: function (extendedJson) {
            _currentPageObject.IsComplete = true;
            _currentPageObject = $.extend(true, _currentPageObject, extendedJson)
            _StateData[_currentPageObject.pageId] = $.extend(true, {}, _currentPageObject);
        },
        AddMenuList: function (_currentPageId) {
            var curPage = _Navigator.GetCurrentPage();
            curPage.isMenuVisited = true;
            debugger;
            $("#appmenulist").html('');
            for (i in gVisitedPages) {
                if ((_NData[i].isDecisionPage != undefined && _NData[i].isDecisionPage) || (_NData[i].isShowInMenu != undefined && _NData[i].isShowInMenu)) {
                    $("#appmenulist").append('<li role="none"><a href="javascript:void(0)" class="menuitem" role="menuitem" tabindex="-1"  data-id="' + i + '">' + gVisitedPages[i].PageTitle + "</a></li>");
                }
            }
            menubutton.binddata();
            if (curPage.isLastPage == undefined)
                showupdateTranscript()

        },
        initializeCustomFdkdiv: function () {
            /* var tempDiv = $("main").find(".submitFeedbackPopup")[0].outerHTML;
             $("main").find(".submitFeedbackPopup").remove();
             $("header").find(".submitFeedbackPopup").remove();
             $("#infoDetails").find(".submitFeedbackPopup").remove()
             $("#wrapper").find(".submitFeedbackPopup").remove();
             $(tempDiv).insertBefore("footer");*/
            _Navigator.initializeCustomQuestion();
        },
        initializeCustomQuestion: function () {
            var curPage = _Navigator.GetCurrentPage();
            if (curPage.isQuestionAttempted) {
                _Navigator.initializeCustomQuestionReview();
            } else {
                $("#btnSubmitResp").k_disable();
                $("#btnSubmitDnD").k_disable();
                $("#btnSubmitImg").k_disable();
                $("#linknext").k_disable();
                if (curPage.QuestionType == "DnD") {
                    initiateDragItems();
                }
            }
        },
        initializeCustomQuestionReview: function (key, value, isResult) {
            var curPage;
            if (isResult != undefined && isResult) {
                curPage = value;
            } else {
                curPage = _Navigator.GetCurrentPage();
            }
            if (curPage.QuestionType == "DnD" && curPage.isQuestionAttempted) {
                if (key == undefined) {
                    key = "container";
                }
                AddDraggableReview(false, key, isResult, curPage);
            } else { }


            $("#btnSubmitResp").k_disable();
            $("#btnSubmitDND").k_disable();
            $("#btnSubmitImg").k_disable();
            $("#linknext").k_enable();
        },
        initializeFdkdiv: function () {
            /*var tempDiv = $("main").find(".submitFeedbackPopup")[0].outerHTML;
            $("main").find(".submitFeedbackPopup").remove();
            $("header").find(".submitFeedbackPopup").remove();
            $("#infoDetails").find(".submitFeedbackPopup").remove()
            $("#wrapper").find(".submitFeedbackPopup").remove();
            $(tempDiv).insertBefore("footer");*/
            _Navigator.initializeQuestion();
        },
        initializeQuestion: function () {
            var curPage = _Navigator.GetCurrentPage();
            if (curPage.isQuestionAttempted) {
                $("#btnSubmit").k_disable();
                _Navigator.initializeQuestionReview();
            } else {
                $("#btnSubmit").k_disable();
                $("#linknext").k_disable();

                if (curPage.isShowHideOpt != undefined && curPage.isShowHideOpt == true) {
                    _Navigator.ShowHideOptions(curPage);
                }
                if (curPage.isRandomOpt != undefined && curPage.isRandomOpt == true) {
                    _Navigator.RandomizeQuestionOptions(curPage);
                }
            }
        },
        ShowHideOptions: function (curPage, isReult, key) {
            var _table;
            if (isReult != undefined && isReult == true) {
                _table = $("#div" + key).find(".option-group table");
            } else {
                _table = $(".option-group table");
            }
        },
        RandomizeQuestionOptions: function (curPage, isReult, key) {
            var obj = {};
            obj.optClass = [];
            var _table;
            if (isReult != undefined && isReult == true) {
                _table = $("#div" + key).find(".option-group table");
            } else {
                _table = $(".option-group table");
            }
            var tableTRLength = _table.find("tr").length;
            var tableTRArray = [];
            for (var k = 0; k < tableTRLength; k++) {
                if ($(_table.find("tr")[k]).is(":visible")) {
                    tableTRArray.push(_table.find("tr")[k].outerHTML);
                }
            }
            _table.html('');

            if (curPage.isQuestionAttempted) {
                var tempData;
                for (var n11 = 0; n11 < gRandomData.length; n11++) {
                    if (curPage.pageId == gRandomData[n11].pageId) {
                        tempData = gRandomData[n11];
                    }
                }
                if (tempData != undefined) {
                    for (var n = 0; n < tempData.optClass.length; n++) {
                        for (var k = 0; k < tableTRArray.length; k++) {
                            var getClass = $(tableTRArray[k]).attr("class");
                            getClass = getClass.replace(' optionselected', '');
                            getClass = getClass.trim();
                            if (tempData.optClass[n] == getClass) {
                                $(_table).append(tableTRArray[k]);
                            }
                        }
                    }
                }
            } else {
                obj.pageId = curPage.pageId;
                tableTRArray = _Navigator.ShuffleArray(tableTRArray);
                for (var n = 0; n < tableTRArray.length; n++) {
                    $(_table).append(tableTRArray[n]);
                    obj.optClass.push($(tableTRArray[n]).attr("class"));
                }
                if (gRandomData.length == 0) {
                    gRandomData.push(obj);
                } else {
                    for (var n11 = 0; n11 < gRandomData.length; n11++) {
                        if (curPage.pageId == gRandomData[n11].pageId) {
                            gRandomData.splice(n11, 1);
                        }
                    }
                    gRandomData.push(obj);
                }
            }
        },
        ShuffleArray: function (arr) {
            for (
                var j, x, i = arr.length; i;
                j = parseInt(Math.random() * i),
                x = arr[--i], arr[i] = arr[j], arr[j] = x
            );
            return arr;
        },
        enabledisabelSubmitBtn: function () {
            var curPage = _Navigator.GetCurrentPage();
            if (curPage.QuestionType == "checklist") {
                var checkedCount = 0;
                for (var n21 = 0; n21 < $('.option-group').find("input").length; n21++) {
                    var inputT = $('.option-group').find("input")[n21];
                    if ($(inputT).prop("checked")) {
                        checkedCount++;
                    }
                }
                if (checkedCount == 2) {
                    $("#btnSubmit").k_enable();
                } else {
                    $("#btnSubmit").k_disable();
                }
            } else {
                $("#btnSubmit").k_enable();
            }
        },
        initializeQuestionReview: function () {
            var curPage = _Navigator.GetCurrentPage();
            if (curPage.QuestionType == "checklist") {
                for (var n21 = 0; n21 < $('.option-group').find("input").length; n21++) {
                    var inputT = $('.option-group').find("input")[n21];
                    for (n22 = 0; n22 < curPage.questions[0].length; n22++) {
                        if ($(inputT).attr("opt_id") == curPage.questions[0][n22]) {
                            $(inputT).prop("checked", "true");
                            $(inputT).closest("tr").find(".option_icon").find("span").addClass("optionspanselected");
                            $(inputT).closest("tr").addClass("optionselected");

                        }
                    }
                }
            } else {
                for (var n21 = 0; n21 < $('.option-group').find("tr").length; n21++) {
                    var inputT = $('.option-group').find("tr")[n21];
                    if ($(inputT).attr("opt_id") == curPage.StudSelOption) {
                        $(inputT).find(".option_icon").find("div").addClass("optionspanselected");
                        $(inputT).addClass("optionselected");
                        $(inputT).attr("selected", true).css("border", "1px solid #33A7C0");
                    }
                }
                $(".submitFeedbackPopup").show();
                for (var n21 = 0; n21 < $(".submitFeedbackPopup").find("div#fdk").length; n21++) {
                    var currOptionID = $(".submitFeedbackPopup").find("div#fdk")[n21].attributes[1].nodeValue;
                    currOptionID = currOptionID.replace(currOptionID, "option" + currOptionID);
                    if (currOptionID == curPage.StudSelOption) {
                        $($(".submitFeedbackPopup").find("div#fdk")[n21]).show();
                    }
                }
            }
            $('.option-group').k_disable();
            $("#linknext").k_enable();
        },
        optionPageSubmitButtonClick: function (_data) {
            var curPage = _Navigator.GetCurrentPage();
            var selectedOptID = []
            if (curPage.QuestionType == "checklist") {
                for (var n21 = 0; n21 < $('.option-group').find("input").length; n21++) {
                    var inputT = $('.option-group').find("input")[n21];
                    if ($(inputT).prop("checked")) {
                        selectedOptID.push($(inputT).attr("optionID"));
                    }
                }
            } else {
                for (var n21 = 0; n21 < $('.option-group').find("tr").length; n21++) {
                    var inputT = $('.option-group').find("tr")[n21];
                    if ($(inputT).hasClass("optionselected")) {
                        selectedOptID.push($(inputT).attr("opt_id"));
                    }
                }
            }

            $('.option-group').k_disable();
            $(".submitFeedbackPopup").show();
            for (var n21 = 0; n21 < $(".submitFeedbackPopup").find("#fdk").length; n21++) {
                var currOptionID = $(".submitFeedbackPopup").find("#fdk")[n21].attributes[2].nodeValue;
                for (n22 = 0; n22 < selectedOptID.length; n22++) {
                    if (currOptionID == selectedOptID[n22]) {
                        $($(".submitFeedbackPopup").find("#fdk")[n21]).show();
                    }
                }
            }

            $("#btnSubmit").k_disable();
            $("#linknext").k_enable();
            curPage.questions.push(selectedOptID);
            curPage.questions[0].isCurrent = true;
            curPage.questions[0].isAnswered = true;
            curPage.isQuestionAttempted = true;
        },
        LoadSummaryPage: function () {
            finaltotalqcnt = 0;
            var pageDt = _Navigator.Get();
            $.each(pageDt, function (key, value) {
                if ((value.isCustomQuestion != undefined && value.isCustomQuestion == true) || (value.isQuestion != undefined && value.isQuestion == true)) {
                    if (value.isVisited) {
                        var curPage = value;
                        var tSelector = $("#div" + key).find('.option-group');
                        var tfSelector = $("#div" + key).find(".submitFeedbackPopup");
                        var tpieImage = $("div[qID=div" + key + "]").find(".pieimage");
                        var tqDataScoreSelector = $("div[qID=div" + key + "]").find(".qScore");

                        if (value.isCustomQuestion != undefined && value.isCustomQuestion == true) {
                            $("#infoDetails").find(".submitFeedbackPopup").remove();
                            _Navigator.initializeCustomQuestionReview(key, value, true);
                        } else {
                            $(tfSelector).show();
                            $(tfSelector).addClass("submitFeedbackPopupSummary");
                            $("#infoDetails").find(".submitFeedbackPopup").remove();

                            $(tfSelector).find("#fdk[opt_id=" + curPage.StudSelOption + "]").show();

                            $(tSelector).find("#span_" + curPage.StudSelOption).closest("tr").css({
                                "border": "4px solid #003058",
                                "border-radius": "5px",
                                "padding-top": "10px",
                                "padding-bottom": "10px",
                                "padding-left": "5px"
                            });

                            $(tSelector).find("#span_" + curPage.StudSelOption).closest("tr").addClass("optionselected")
                            $(tSelector).find("#span_" + curPage.StudSelOption).closest("tr").find(".option_icon").find("div").addClass("optionspanselected");
                            $(tSelector).find("#span_" + curPage.StudSelOption).closest("tr").css({
                                "border": "4px solid #003058",
                                "border-radius": "5px",
                                "padding-top": "10px",
                                "padding-bottom": "10px",
                                "padding-left": "5px"
                            });


                            $("#div" + key).find('.option-group').k_disable();
                        }
                        _image = "assets/images/" + curPage.userScore + "point.png";
                        $(tpieImage).html("<img alt='piechart' style='width:15px;height:16px;margin-top:4px;'src='" + _image + "'></img>");
                        finalScore = "Points " + curPage.userScore + " out of 5"
                        $(tqDataScoreSelector).html("<p><strong> " + finalScore + "</strong></p>");
                        $("#div" + key).hide();


                    } else {
                        $("div[qID=div" + key + "]").hide();
                        $("#div" + key).hide();
                    }
                }
            });
        },
        checkRetryButton: function () {
            var attemptsRemainingText = '';
            if (gAllowedAttempts == 0 || (_Navigator.GetAttemptNumber() < gAllowedAttempts)) {
                if (gAllowedAttempts != 0) {
                    var attemptsRemaining = (gAllowedAttempts - _Navigator.GetAttemptNumber());
                    attemptsRemainingText = 'Number of attempts remaining: ' + attemptsRemaining;
                } else {
                    attemptsRemainingText = 'Number of attempts remaining: Unlimited';
                }
                $("#retryattemptText").html(attemptsRemainingText);

            } else {
                attemptsRemainingText = 'Number of attempts remaining: none';
                $("#btnRetry").k_disable();
                $("#retryattemptText").html(attemptsRemainingText);
            }
        },
        RetryAttempt: function () {
            transcriptIDs = [];
            gVisitedPages = {};
            gStudentScore = 0;
            gCommonData = '';
            tempgCommonData = undefined;
            isPrev = false;
            _lastDuration = 0;
            var pageDt = _Navigator.Get();
            $.each(pageDt, function (key, value) {
                if (value.isQuestion != undefined && value.isQuestion == true) {
                    delete value.userScore;
                    value.isQuestionAttempted = false;
                    value.StudSelOption = "";
                    if (value.isCustomNext) {
                        value.nextPageId = '';
                    }
                }
                if (value.isCustomQuestion != undefined && value.isCustomQuestion == true) {
                    value.isQuestionAttempted = false;
                    delete value.userScore;
                    value.questions = [];
                }
                value.IsComplete = false;
                value.isVisited = false;
                delete value.isMenuVisited;
                delete value.PageTitle;
            });
            if (_Navigator.IsXL()) {
                _sessionData = _EconLabServiceManager.GetSessionData();
                var lastAttIndex = _sessionData.attempts.length - 1;
                _sessionData.attempts[lastAttIndex].status = "inprogress";
                _KnowdlServiceManager.RetryAttempt();

            }            _Navigator.LoadPage("l1p1");
        },
        GetUserScore: function () {
            var pageDt = _Navigator.Get();
            var totUserScore = 0, totMaxScore = 0;
            var userScorePerc = 0;

            $.each(pageDt, function (key, value) {
                if (!isNaN(value.userScore) && value.userScore != undefined && ((value.isQuestion != undefined && value.isQuestion == true) || (value.isCustomQuestion != undefined && value.isCustomQuestion == true))) {
                    totUserScore += Number(value.userScore);
                    totMaxScore += Number(value.maxScore);
                }
            });

            userScorePerc = Math.round((totUserScore / totMaxScore) * 100)

            var obj = {};
            obj.userScorePerc = userScorePerc;

            return obj;
        },
        GetSelectedOptionNumberForMulticheck: function () {
            var curPage = _Navigator.GetCurrentPage();
            var selectedOptID = [];
            var score = 0;
            for (var n21 = 0; n21 < $('.option-group').find("input").length; n21++) {
                var inputT = $('.option-group').find("input")[n21];
                if ($(inputT).prop("checked")) {
                    selectedOptID.push($(inputT).attr("opt_id"));
                }
            }
            var selOptString = selectedOptID[0] + "_" + selectedOptID[1]
            if (selOptString == "option1_option2") {
                score = 1;
            }
            var obj = {};
            obj.selOption = selOptString;
            obj.iscorrect = score;
            return obj;
        },
        GetRandomPageId: function () {
            var pageId = '';
            if (_currentPageObject.pageId == 'l1p2') {
                var _ctrlId = _currentPageObject.StudSelOption;
                switch (_ctrlId) {
                    case 'option1':
                        _nxtPgId = 'l1p3';
                        break;
                    case 'option3':
                        _nxtPgId = 'l1p4';
                        break;
                    case 'option2':
                        _nxtPgId = 'l1p5';
                        break;
                }
                pageId = _nxtPgId;
            } else if (_currentPageObject.pageId == 'l1p10') {
                var _ctrlId = _currentPageObject.StudSelOption;
                switch (_ctrlId) {
                    case 'option1':
                        _nxtPgId = 'l1p12';
                        break;
                    case 'option2':
                        _nxtPgId = 'l1p13';
                        break;
                    
                }
                pageId = _nxtPgId;
            } else if (_currentPageObject.pageId == 'l1p11') {
                var _ctrlId = _currentPageObject.StudSelOption;
                switch (_ctrlId) {
                    case 'option1':
                        _nxtPgId = 'l1p14';
                        break;
                    case 'option2':
                    case 'option3':
                        _nxtPgId = 'l1p15';
                        break;
                }
                pageId = _nxtPgId;
            } else if (_currentPageObject.pageId == '') {
                var _ctrlId = _currentPageObject.StudSelOption;
                switch (_ctrlId) {
                    case 'option1':
                        _nxtPgId = '';
                        break;
                    case 'option2':
                    case 'option3':
                        _nxtPgId = '';
                        break;

                }
                pageId = _nxtPgId;
            }
            return pageId;
        },
        LongestPath: function (NodeTree, startNode) {
            var paths = [];
            function findAllPaths(startNode, currentCost, optionCost, pathstr) {
                for (var i = 0; i < startNode.options.length; i++) {
                    var child = startNode.options[i];
                    if (child.NextPgId == null) {
                        paths.push({
                            TotalLength: currentCost,
                            TotalOptionCount: optionCost,
                            Path: pathstr
                        });
                    } else {
                        var optCost = startNode.isQuestion == true ? optionCost + 1 : optionCost;
                        findAllPaths(NodeTree[child.NextPgId], currentCost + 1, optCost, pathstr + "-" + child.NextPgId);
                    }
                }
                pathstr = "";
            }
            findAllPaths(startNode, 1, 0, startNode.pageId + "");
            function getMax(arr, prop) {
                var max;
                for (var i = 0; i < arr.length; i++) {
                    if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                        max = arr[i];
                }
                return max;
            }
            return getMax(paths, 'TotalLength');
        },
        SetPresenterMode: function (val) {
            packageType = val;
        },
        IsRevel: function () {
            if (packageType == "revel")
                return true;
            return false;
        },
        IsXL: function () {
            if (packageType == "XL")
                return true;
            return false;
        },
        GetTotalDuration: function () {
            return parseInt((new Date().getTime() - _startTime.getTime()) / 1000) + _lastDuration;
        },
        UpdateClassAverage: function (classAverage) {
            if (_EconLabServiceManager.GetSettings().CA_Dial_Off_SR != undefined && _EconLabServiceManager.GetSettings().CA_Dial_Off_SR) {
                return;
            }
            if(!this.IsXL()){
                classAverage = _Navigator.GetUserScore().userScorePerc;
            }
            $("#inCirTxt3").html(classAverage + "%");
            $("#inScrTxt3").html("Class average: " + classAverage + "%");
            $("#aScore").addClass("p" + classAverage);
        },
        disableBRTag: function () {
            $(".container br").attr("aria-hidden", "true");
        },

        //end
    }

})();

$(document).on("click", "#linkprevious", function (event) {
    if ($(this).k_IsDisabled()) return;
    $("#linkprevious").k_disable();
    _Navigator.Prev();
});
$(document).on("click", "#linknext", function (event) {
    if ($(this).k_IsDisabled()) return;
    $("#linknext").k_disable();
    _Navigator.Next();
});
