function QuestionOptionChanged(_ths) {
    if (_ths.attributes.opt_id.value != undefined) {
        selOption = _ths.attributes.opt_id.value;
    }
    if (_ths.attributes.iscorrect.value != undefined) {
        iscorrect = _ths.attributes.iscorrect.value;
    }
}

function SubmitQuestionResponse() {
    var scoreSet = [0, 3, 5, 1];
    var curPage = _Navigator.GetCurrentPage();
    var visitedPageObj = _Navigator.GetVisitedPage(curPage.pageId)
    if (curPage.QuestionType == "checklist") {
        tempObj = _Navigator.GetSelectedOptionNumberForMulticheck();
        selOption = tempObj.selOption;
        iscorrect = tempObj.iscorrect;
    }
    $("#btnSubmit").k_disable();
    $('.option-group').k_disable();
    $("#infoDetails").find(".submitFeedbackPopup").remove();
    $("#transcriptDetails").find(".submitFeedbackPopup").remove();
    $(".submitFeedbackPopup").find("div.instrCustomMsg").remove();
    $(".submitFeedbackPopup").show();

    $(".submitFeedbackPopup").find("#fdk[opt_id=" + selOption + "]").show();
    $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () {
    });

    var toptions = [];
        var opts = $(".option-group tr");
        for (var i = 0; i < opts.length; i++) {
            var opt = {}
            opt.Id = $(opts[i]).attr("opt_id");
            opt.Text = $(opts[i]).find(".option_txt").text();
            opt.Points = $(opts[i]).attr("qscore") != undefined ? Number($(opts[i]).attr("qscore")) : 0;
            if (opt.Points == scoreSet[0]) {
                opt.Status = "incorrect";
            } else if (opt.Points == scoreSet[1]) {
                opt.Status = "partial";
            } else {
                opt.Status = "correct";
            }
            /*ATUL Old code
            opt.rolloverImg = $(opts[i]).find(".k-element-button").attr("rolloverimgsrc");
            opt.Img = $(opts[i]).find(".k-element-button").attr("orignalsrc");
            if (opt.Img == undefined || opt.Img == "") {
                opt.Img = $(opts[i]).find(".k-element-button img.lblImg").attr("src");
            }*/
            /*ATUL
            opt.rolloverImg = $(opts[i]).find(".option_icon").text();
            opt.Img = $(opts[i]).find(".option_icon").text();
            */
           opt.rolloverImg = $(opts[i]).find(".option_icon").children().attr("class");
           opt.Img = $(opts[i]).find(".option_icon").children().attr("class");
            
            opt.FeedbackText = $(".submitFeedbackPopup").find("[opt_id='"+opt.Id+"'] p").first().text();
            toptions.push(opt);
        }

    var qtnTitle = $(".pageTitle").text();
    var QtnText = $(".pagedesc").text();
    


    curPage.StudSelOption = selOption;
    curPage.isQuestionAttempted = true;
    curPage.userScore = Number($('.option-group').find("tr[opt_id=" + selOption + "]").attr("qScore"));

    visitedPageObj.StudSelOption = selOption;
    visitedPageObj.isQuestionAttempted = true;
    visitedPageObj.userScore = Number($('.option-group').find("tr[opt_id=" + selOption + "]").attr("qScore"));

    //
    var AnsStatus = true;
    if(curPage.userScore == 0){
        AnsStatus = false;
    }
    
    var qObj = {};
        qObj.QId = curPage.pageId;
        qObj.PId = curPage.pageId;
        qObj.QText = QtnText;
        qObj.QOptions = toptions;
        qObj.QSelOptionId = selOption;
        qObj.QTotal = scoreSet[2];
        qObj.QPoints = curPage.userScore;
        qObj.QCorrectStatus = AnsStatus;
        qObj.QTitle = qtnTitle;
        _KnowdlServiceManager.PostQuestionData(qObj);


    $('.option-group').find("tr[opt_id=" + selOption + "]").css({
        "border": "1px solid #33A7C0"


    });
    $("#btnSubmit").k_disable();
    $('.option-group').k_disable();
    $("#linknext").k_enable();
    showupdateTranscript();
    _Module.SaveSessionData();
}

function SubmitQuestionScore() {
    var tScore = _Navigator.GetUserScore();
    var getTotalScoreArray = [];
    getTotalScoreArray.push(tScore.userScorePerc);
    $("#yScore").addClass("p" + tScore.userScorePerc);
    $("#inCirTxt1").html(tScore.userScorePerc + "%");
    $("#inScrTxt1").html("Your score: " + tScore.userScorePerc + "%");
    var finalScore = (tScore.userScorePerc) / 100;
}
