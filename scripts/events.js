$(document).on("click", ".question-band tr", function (event) {
    $('.question-band tr').removeClass("optionselected");
    $('.question-band tr').find(".option_icon").find("div").removeClass("optionspanselected");
    $(this).find(".option_icon").find("div").addClass("optionspanselected");
    $(this).addClass("optionselected");
    _Navigator.enabledisabelSubmitBtn();
});
/*
$(document).on("click", ".info-icon,.pageinfo-details", function (event) {
    $("#infoDetails").load("pagedata/aboutpopup.htm");
    $("#transcriptDetails").slideUp("slow", function () {    // Animation complete.
    });
    $("#infoDetails").slideToggle("slow", function () {
        //$("#infoDetails").find("footer").css("display", "none");        
    });
});
*/

$(document).on("click", "#btntranscriptclose", function (event) {
    

    $('#transcriptDetails').slideUp('slow', function () { });
    $("html, body").scrollTop(0);
});

$(document).on("click", "#btnaboutsimclose", function (event) {
    

    $('#infoDetails').slideUp('slow', function () { });
    $("html, body").scrollTop(0);
});
$(document).on("click", "#resultexpand", function (event) {
    
    $("#resultcollapse").show();
    $("#resultexpand").hide();
    $(".qArrowlink").each(function () {
        var qID = $(this).parent()[0].attributes[1].value;
        if ($("div[qID=" + qID + "]").css('display') != 'none'){
            

            if ($("div[qID=" + qID + "]").find(".qArrowlink img").hasClass("selctImg")) {
                
            } else {
                $("div[qID=" + qID + "]").find(".qArrowlink img").addClass("selctImg");
                $("div[qID=" + qID + "]").find(".qArrowlink img").attr("src", "assets/images/arrow_down_r.png");
                $("#" + qID).slideToggle("slow", function () {
                });
              
            }
           
        }

    })
    

});
$(document).on("click", "#resultcollapse", function (event) {
    $("#resultcollapse").hide();
    $("#resultexpand").show();
    $(".qArrowlink").each(function () {
        var qID = $(this).parent()[0].attributes[1].value;
        if ($("div[qID=" + qID + "]").css('display') != 'none') {
           
            if ($("div[qID=" + qID + "]").find(".qArrowlink img").hasClass("selctImg")) {
                $("#" + qID).slideToggle("slow", function () {
                });
                $("div[qID=" + qID + "]").find(".qArrowlink img").removeClass("selctImg");
                $("div[qID=" + qID + "]").find(".qArrowlink img").attr("src", "assets/images/arrow_side_r.png");
            }
            else {
                //$("div[qID=" + qID + "]").find(".qArrowlink img").addClass("selctImg");
                //$("div[qID=" + qID + "]").find(".qArrowlink img").attr("src", "assets/images/arrow_down_r.png");
               // $("#" + qID).slideToggle("slow", function () {});
            }

        }
        })
   

});
/*
$(document).on("click", ".transcript-popup", function (event) {
    $("#transcriptDetails").load("pagedata/transcript.htm");
    $("#infoDetails").slideUp("slow", function () {
        // Animation complete.
    });
    //$("#infoDetails").hide();
    $("#transcriptDetails").show();
        showupdateTranscript();
    
});
*/

$(document).on("click", "#transcriptDetails #btntranscriptclose", function(
    event
  ) {
    if ($(this).k_IsDisabled()) {
      return false;
    } else {
      $("#transcriptDetails").hide();
      $("#pageaction_btn2").attr("aria-expanded", "false");
      $(".transcript-popup")
        .attr("tabindex", "-1")
        .focus();
      setTimeout(function() {
        $("#pageaction_btn2").focus();
      });
    }
  });
  
  

$(document).on("click", "#infoDetails #btnaboutsimclose", function(event) {
    if ($(this).k_IsDisabled()) {
      return false;
    } else {
      $("#infoDetails").hide();
      $("#pageaction_btn3").attr("aria-expanded", "false");
      $(".info-icon")
        .attr("tabindex", "-1")
        .focus();
      setTimeout(function() {
        $("#pageaction_btn3").focus();
      });
    }
  });
  
  $(document).on("click", ".abtPgMoreInfoLink", function(event) {
    $(".aboutPageInfoDetailsDiv").slideToggle("slow", function () {
        if ($(".aboutPageInfoDetailsDiv").css("display") == "none") {
            $(".abtPgMoreInfoLink").attr("aria-expanded", "false");
            //$("#aboutPageInfoDetails").hide();
            $(".abtPgMoreInfoLink")
              .attr("tabindex", "0")
              .focus();
        } else {
            $(".abtPgMoreInfoLink").attr("aria-expanded", "true");
            //$("#aboutPageInfoDetails").show();
            $(".abtPgMoreInfoLink")
              .attr("tabindex", "0")
              .focus();
        }
    });
    _Navigator.disableBRTag();
  });
  
  $(document).on("click", "#pageaction_btn2", function(event) {
    debugger;
    if ($("#pageaction_btn2").attr("aria-expanded") == "false") {
      $("#pageaction_btn3").attr("aria-expanded", "false");
      $("#pageaction_btn2").attr("aria-expanded", "true");
      $("#pageaction_btn2").focus();
      $("#transcriptDetails").load("pagedata/transcript.htm", function() {
        _Navigator.disableBRTag();
        showupdateTranscript();
        $("#transcriptDetails").show();
        $("#infoDetails").hide();
      });
    } else {
      $("#transcriptDetails").hide();
      $("#pageaction_btn2").attr("aria-expanded", "false");
      $("#pageaction_btn2").focus();
    }
  });
  
  $(document).on("click", "#pageaction_btn3", function(event) {
    if ($("#pageaction_btn3").attr("aria-expanded") == "false") {
      $("#pageaction_btn2").attr("aria-expanded", "false");
      $("#pageaction_btn3").attr("aria-expanded", "true");
      $("#pageaction_btn3").focus();
      $("#infoDetails").load("pagedata/aboutpopup.htm", function() {
        _Navigator.disableBRTag();
        //updateAboutPageDetails("popup");
        $("#infoDetails").show();
        $("#transcriptDetails").hide();
      });
    } else {
      $("#infoDetails").hide();
      $("#pageaction_btn3").attr("aria-expanded", "false");
      $("#pageaction_btn3").focus();
    }
  });

//Result page
$(document).on("click", ".qArrowlink,.qTitle", function (event) {
    var qID = $(this).parent()[0].attributes[1].value;

    if ($("div[qID=" + qID + "]").find(".qArrowlink img").hasClass("selctImg")) {
        $("div[qID=" + qID + "]").find(".qArrowlink img").removeClass("selctImg");
        $("div[qID=" + qID + "]").find(".qArrowlink img").attr("src", "assets/images/arrow_side_r.png");
    } else {
        $("div[qID=" + qID + "]").find(".qArrowlink img").addClass("selctImg");
        $("div[qID=" + qID + "]").find(".qArrowlink img").attr("src", "assets/images/arrow_down_r.png");
    }
    $("#" + qID).slideToggle("slow", function () {
    });
});

function showupdateTranscript() {
    var pageDt = _Navigator.Get();
    $.each(pageDt, function (key, value) {
        var curPage = _Navigator.GetCurrentPage();
        $.each(transcriptIDs, function (tkey, tValue) {
            if (value.pageId == tValue) {
                $("#transcriptDetails").find("div[id=" + value.pageId + "]").css("display", "inline-block");
                var tPageID = $("#transcriptDetails").find("div[id=" + value.pageId + "]");
                if (value.QuestionType == "DnD" && value.isQuestionAttempted && value.IsComplete) {
                    AddDraggableReviewTranscript(tPageID, value);
                }

                else {
                    if ((value.StudSelOption != undefined && value.StudSelOption.trim() != "")) {
                        if (value.QuestionType == "checklist") {
                            var tempAr = value.StudSelOption.split("_");
                            $(tPageID).find(".Toption[opt_id=" + tempAr[0] + "]").show();
                            $(tPageID).find(".Toption[opt_id=" + tempAr[1] + "]").show();
                        } else {
                            $(tPageID).find(".Toption[opt_id=" + value.StudSelOption + "]").show();
                            $(tPageID).find(".Toption[opt_id=" + value.StudSelOption + "]").css("display", "inline-block");
                        }
                    }
                }
            }
        });
    });
    updateLearningObjectives(false);
} 

function addCustomQuestionTranscript(_selector, _curPage) {
  curPage = _curPage;
  selectedOptID = curPage.questions[0];
  var crntId, crntGroup;
  if (curPage.QuestionType == "DnD" || curPage.QuestionType == "ImgDnD") {
      for (var k = 0; k < $(_selector).find(".droppedText").length; k++) {
          $(_selector).find(".droppedText")[k].innerHTML = "";
          if (curPage.pageId == "l1p19") {
              crntGroup = $(_selector).find(".droppedText")[k].attributes[2].nodeValue;
              for (var n31 = 0; n31 < selectedOptID.length; n31++) {
                  if (selectedOptID[n31].dragGroup == crntGroup) {
                      $($(_selector).find(".droppedText")[k]).append(selectedOptID[n31].htm);
                  }
              }
          } else {
              crntId = $(_selector).find(".droppedText")[k].attributes[1].nodeValue;
              for (var n31 = 0; n31 < selectedOptID.length; n31++) {
                  if (selectedOptID[n31].crntDrop == crntId) {
                      $($(_selector).find(".droppedText")[k]).append(selectedOptID[n31].htm);
                  }
              }
          }
      }
  } else {
      $(_selector).find(".userResponse").html(curPage.userAns);
  }
}

function retryModule() {
    _Navigator.IncreamentAttempt();
    _Navigator.RetryAttempt();
}

$(document).on("click", function (event) {
    if ($(this).k_IsDisabled()) {
        //#v1.1
        return false;
    }
    if (event.target.className.indexOf("teameam") == -1) {
        $("#TeamMenu").hide();
    }
    if (event.target.id != "appmenulibar" && event.target.id != "appmenu" && event.target.id != "appmenulist") {
        $("#appmenu > li").attr("aria-expanded", "false");
        $("#appmenu > li").css("border", "0px");
        $("#appmenu > li").find(".dummyMenuDiv").hide();
    }
});
$(document).on("click", "#appmenulist > li a", function (event) {
    if ($(this).k_IsDisabled()) {
        return false;
    }
    var levelPageId = $(this).attr("data-id");
    //alert(levelPageId)
    $("#infoDetails").hide();
    $("#transcriptDetails").hide();
    var jsonObj = {};
    jsonObj.isMenuVisit = true;
    jsonObj.pageId = levelPageId;
    menubutton.close();
    _Navigator.LoadPage(levelPageId, jsonObj);
    //$("#appmenu li").attr("aria-expanded", false).css({ 'background': '#045C42' });
    //$("#appmenu li img").attr("src", "scripts/external/menu/menu-icon.png");
    event.preventDefault();
    event.stopPropagation();
    return false;
});
$(document).on("click", "#appmenu > li li a", function (event) {
    if ($(this).k_IsDisabled()) {
        return false;
    }
    debugger;
    var levelPageId = $(this).attr("data-id");
    $("#infoDetails").hide();
    $("#transcriptDetails").hide();
    var jsonObj = {};
    jsonObj.isMenuVisit = true;
    jsonObj.pageId = levelPageId;
    _Navigator.LoadPage(levelPageId, jsonObj);
    event.preventDefault();
    event.stopPropagation();
    return false;
}); 

/* Dnd page code */
function initiateDragItems() {
  $(".dragDiv").draggable({      
    cancel: "a.ui-icon",
    revert: "invalid",
    containment: ".wrapperimage",
    cursor: "move",
    drag: function(event, ui) {},
    start: function(event, ui) {
        $('.dragdropwrap:not(:has(.dragDiv))').remove()
      $(ui.helper).css("z-Index", 100);
      ui.helper.data("rejected", true);
      ui.helper.data("original-position", ui.helper.offset());
    },
    revert: function(event, ui) {
      $(this).data("draggable");
      return !event;
    },
    stop: function(event, ui) {
      if (ui.helper.data("rejected") === true) {
        ui.helper.offset(ui.helper.data("original-position"));
      }
      $('.dragdropwrap:not(:has(.dragDiv))').remove();
    }
  });
  $(".dropDiv1").droppable({
    accept: ".dragDiv",
    drop: function(event, ui) {
      ui.helper.data("rejected", false);
      AddDraggable(ui.draggable, ".dropDiv1", true); //#v1.3
    }
  });
  $(".dropDiv2").droppable({
    accept: ".dragDiv",
    drop: function(event, ui) {
      ui.helper.data("rejected", false);
      AddDraggable(ui.draggable, ".dropDiv2", true); //#v1.3
    }
  });
  $(".dropDiv3").droppable({
    accept: ".dragDiv",
    drop: function(event, ui) {
      ui.helper.data("rejected", false);
      AddDraggable(ui.draggable, ".dropDiv3", true); //#v1.3
    }
  });
}

function AddDraggable($item, draggableClass, isDropped) {

  if ($(draggableClass).find(".itemdropped").length == 2) {
    if (isDropped) {
      //#v1.3
      $item.offset($item.data("original-position"));
    }
    return;
  }
  $item.appendTo(draggableClass);
  $item.addClass("itemdropped");
  if ($item.attr("crtDrop") == $(draggableClass).attr("DropId")) {
    $item.attr("isCrt", "true");
  } else {
    $item.attr("isCrt", "false");
  }
  $item.attr("crntDrop", $(draggableClass).attr("DropId"));
  $item.wrap("<div class='dragdropwrap'></div>");
  $($item)
    .closest(".dragdropwrap")
    .append(
      '<span id="delItem" role="button"  aria-label="Close" tabindex=0><img src="assets/images/close-white.png" alt="" style="z-index:10"></span>'
    );

  //#v1.3
  AdjustDroppables(draggableClass);

  if ($(".itemdropped").length == 4) {
    $("#btnSubmitDnD").k_enable();
  } else {
    $("#btnSubmitDnD").k_disable();
  }

  var dragtext =
    $item.attr("data-aria-label") +
    " dropped in " +
    $(draggableClass)
      .find(".accessibility")
      .text();

  $item.attr("aria-label", dragtext);
  $(".labelassertive").text(dragtext);
}
function AddDraggableReview(_isTran, _selector, _isResult, _curPage) {
    var selector;
    var curPage;
    if (_isResult == undefined) {
      _selector = ".option-group.dragdrop"; //#v1.3
      selector = $(_selector);
      curPage = _Navigator.GetCurrentPage();
    } else {
      selector = $("#div" + _selector);
      curPage = _curPage;
    }
    selectedOptID = curPage.questions;
  
    selectedOptID = curPage.questions;
    for (var n31 = 0; n31 < selectedOptID.length; n31++) {
        $(selector).find(".dragDiv[optionID='" + (selectedOptID[n31].optionID) + "']").attr("isCrt", selectedOptID[n31].isCrt);
        var cHTml = $(selector).find(".dragDiv[optionID='" + (selectedOptID[n31].optionID) + "']")[0].outerHTML;

        if (selectedOptID[n31].crntDrop == "1") {
            $(selector).find(".dropDiv1").append(cHTml)
        } else if (selectedOptID[n31].crntDrop == "2") {
            $(selector).find(".dropDiv2").append(cHTml)

        } else if (selectedOptID[n31].crntDrop == "3") {
            $(selector).find(".dropDiv3").append(cHTml)
        }
    }
    $(selector).find("#dropArea").find(".dragDiv").each(function () {
        if ($(selector).find(this).attr('isCrt') == "true")
            $(selector).find(this).css({ top: "10px", left: "9px", position: "relative", border: "1px solid green" });
        else
            $(selector).find(this).css({ top: "10px", left: "9px", position: "relative", border: "1px solid red" });
    });
    $(selector).find("#dragArea").html('');
  
    //#v1.3
    $(selector)
      .find("#dropArea")
      .find(".dropDiv")
      .each(function() {
        var draggableClass = $(this);
        //AdjustDroppables(draggableClass);
      });
  
    $(selector)
      .find("#dragArea")
      .html("");
  
    if (_isResult == undefined) {
      $(".submitFeedbackPopup")
        .find("div#fdk[corrsequence='" + curPage.CorrectSequence + "']")
        .show();
      $(".option-group").k_disable();
      $(".submitFeedbackPopup").show();
      $(".submitFeedbackPopup")
        .find("#lastspanNext")
        .css("display", "block");
      $("#btnSubmitDnD").k_disable();
      $("#linknext").k_enable();
    } else {
      $(selector)
        .find(".submitFeedbackPopup")
        .find("div#fdk[corrsequence='" + curPage.CorrectSequence + "']")
        .show();
      $(selector)
        .find(".option-group")
        .k_disable();
      $(selector)
        .find(".submitFeedbackPopup")
        .show();
    }
  }
  
//#v1.4
function AdjustDroppables(dclass) {
  var top1 = 10;
  var top2 = 10;
  var ht = 30;
  var i = 0;
  $(dclass)
    .find(".itemdropped")
    .each(function() {
      if (i > 0) {
        $(this).css({ top: top2 + "px", left: "10px" });
        top2 = top2 + 70;
      } else {
        $(this).css({ top: top1 + "px", left: "10px" });
        top1 = top1 + 70;
      }
      ht += $(this)[0].offsetHeight + 10;
      i++;
    });

  if (isIpad || IsIphone || isAndroid || isIE11version || Macos) {
    $(dclass).css("height", ht);
  }
}
$(document).on("click", "#delItem", function(event) {
    
  $(this)
    .closest("div")
    .find(".dragDiv")
    .removeAttr("isCrt");
  var dropid = $(this)
    .closest("div")
    .find(".dragDiv")
    .attr("crntDrop");
  var droppabletext = $(this)
    .closest(".dropDiv")
    .find(".accessibility")
    .text();

  $(this)
    .closest("div")
    .find(".dragDiv")
    .removeAttr("crntDrop style itemdropped");

  $(this)
    .closest("div")
    .find(".dragDiv")
    .attr(
      "aria-label",
      $(this)
        .closest("div")
        .find(".dragDiv")
        .attr("data-aria-label")
    );
  var assertivetext =
    $(this)
      .closest("div")
      .find(".dragDiv")
      .attr("data-aria-label") +
    " removed from " +
    droppabletext;
  $(".labelassertive").text(assertivetext);

  //$(this).find("#dragDivImg").css("margin", "5%");
  var HTML = $(this)
    .closest("div")
    .find(".dragDiv")[0].outerHTML;
  $(this)
    .closest("div")
    .remove();
  $("#dragArea").append(HTML);
  $("#dragArea")
    .find("#delItem")
    .remove();
  initiateDragItems(_Navigator.GetCurrentPage());
  if ($(".itemdropped").length == 4) {
    $("#btnSubmitDnD").k_enable();
  } else {
    $("#btnSubmitDnD").k_disable();
  }
  AdjustDroppables($(this)
    .closest(".dropDiv").attr("id"));
  event.preventDefault();
  event.stopPropagation();
});

$(document).on("click", "#btnSubmitDnD", function(event) {
    $("#infoDetails").find(".submitFeedbackPopup").remove();
    $("#dropArea").find("span#delItem").each(function () {
        $(this).remove();
    });
    var curPage = _Navigator.GetCurrentPage();
    var totalScore = 0;
    var _Score = 0;
    var corrSequence = 0;
    selectedOptID = [];
    var dropId = $("#dropArea").attr('dropid');

    $("#dropArea").find(".dragDiv").each(function (_trIndex, _tr) {
        obj = {}
        obj.optionID = _trIndex + 1;
        obj.isCrt = $(".dragDiv[optionID='" + (_trIndex + 1) + "']").attr("isCrt")
        obj.htm = $(".dragDiv[optionID='" + (_trIndex + 1) + "']").html();
        if (obj.isCrt == "true") {
            $(".dragDiv[optionID='" + (_trIndex + 1) + "']").css("border", "1px solid green")
            totalScore++;
        }
        else {

            $(".dragDiv[optionID='" + (_trIndex + 1) + "']").css("border", "1px solid red")
        }
        obj.crntDrop = $(".dragDiv[optionID='" + (_trIndex + 1) + "']").attr("crntDrop");
        selectedOptID.push(obj);
    });

    if (totalScore == 4) {
        _Score = 5;
        corrSequence = 1;
    }
    else if (totalScore == 3) {
        _Score = 3;
        corrSequence = 2;
    }
    else if (totalScore == 1 || totalScore == 2) {
        _Score = 1;
        corrSequence = 3;
    }
    else {
        _Score = 0;
        corrSequence = 4;

    }

    curPage.CorrectSequence = corrSequence;
    $(".submitFeedbackPopup").find("div#fdk[corrSequence='" + (curPage.CorrectSequence) + "']").show();
    
    curPage.questions = selectedOptID;
    curPage.isCurrent = true;
    curPage.isAnswered = true;
    curPage.isQuestionAttempted = true;
    curPage.userScore = _Score;

  var visitedPageObj = _Navigator.GetVisitedPage(curPage.pageId);
    visitedPageObj.questions = selectedOptID;
    visitedPageObj.CorrectSequence = corrSequence;
    visitedPageObj.isCurrent = true;
    visitedPageObj.isAnswered = true;
    visitedPageObj.isQuestionAttempted = true;
    visitedPageObj.userScore = _Score;
  $(".option-group").k_disable();
  $(".submitFeedbackPopup").show();
  $(".submitFeedbackPopup")
    .find("#lastspanNext")
    .css("display", "block");
  $("#btnSubmitDnD").k_disable();
  $("#linknext").k_enable();
  $("html,body").animate(
    { scrollTop: document.body.scrollHeight },
    1000,
    function() {}
  );
  _Module.SaveSessionData();
});

function AddDraggableReviewTranscript(_selector, _curPage) {
    curPage = _curPage;
    selectedOptID = curPage.questions;
    var crntId;
    for (var k = 0; k < $(_selector).find(".droppedText").length; k++) {
        $(_selector).find(".droppedText")[k].innerHTML = '';
        crntId = $(_selector).find(".droppedText")[k].attributes[1].nodeValue;
        for (var n31 = 0; n31 < selectedOptID.length; n31++) {
            if (selectedOptID[n31].crntDrop == crntId) {
                $($(_selector).find(".droppedText")[k]).append(selectedOptID[n31].htm)
            }
        }
    }
}
$(document).on('keyup', "#delItem", function (event) {
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $(this).trigger('click');
    }
});
$(document).on("click", ".dragDiv", function(event) {
  if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
    event.preventDefault();
    return;
  } else {
    if ($(".selected").length > 0) {
      $(".selected").attr("aria-pressed", "false");
      $(".selected").each(function() {
        if (Macos != -1 && isSafari && !(isIpad || isIphone)) {
          $(this).attr("aria-label", $(this).attr("data-aria-label"));
        }
      });
      $(".selected")
        .removeClass("selected")
        .css("border", "1px solid #000000");
    }
    $(this).css("border", "cornflowerblue solid 2px");
    $(this).addClass("selected");

    $(this).attr({ "aria-pressed": "true" });
    if (Macos != -1 && isSafari && !(isIpad || isIphone)) {
      $(this).attr({
        "aria-label": $(this).attr("data-aria-label") + " selected"
      });
    }
    $(".dropDiv").css("border", "cornflowerblue solid 2px");
  }
  event.preventDefault();
  event.stopPropagation();
  return false;
});

$(document).on("click touchstart", ".dropDiv", function(event) {
    if ($(".selected").length == 0) return;
    var pagedata = _Navigator.GetCurrentPage();
    $(".selected").addClass("dropped");
    var draggable = $(".selected");
    var dropid = "#" + $(this).attr("id");
    AddDraggable(draggable, dropid);
  
    $(".selected").attr("aria-pressed", "false");
    $(".selected").css("border", "1px solid #000");
    $(".selected").removeClass("selected");
    $(".dropDiv").css("border", "1px solid #007fa3");
    event.preventDefault();
    event.stopPropagation();
    $('.dragdropwrap:not(:has(.dragDiv))').remove();
    return false;
  });
$(document).on('keyup', "#btnSubmitDnD", function (event) {
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $(this).trigger('click');
    }
});

$(document).on(
  "keyup",
  "#editIconTeamName, #linkChangeTeam, .question-band tr, #linkCreateTeamName, #btnSubmitImg, .SaveBtn, .dropDiv, #delItemImg, #delItem, #btnSubmitImgDnD, .dragDiv",
  function(event) {
    if (window.event) {
      key = window.event.keyCode;
    } else if (event) {
      key = event.keyCode;
    }
    if (key == 13) {
      $(this).trigger("click");
    }
  }
);
function updateAboutPageDetails(_page) {
    //$("#infoDetails").find(".aboutStartPage").remove();
    //#v1.2
    if (_page == "intro") {
        if($(".aboutStartPage").html() != undefined){
            $(".aboutStartPage").html($(".aboutStartPage").html().replace("###teamScore###", tScoreObj.TeamPercentage).replace("###userScore###", tScoreObj.StudPercentage).replace("###timelimitText###", tScoreObj.TimeLimit));
        }
    } else {
        $(".aboutPopupPage").html($(".aboutPopupPage").html().replace("###teamScore###", tScoreObj.TeamPercentage).replace("###userScore###", tScoreObj.StudPercentage).replace("###timelimitText###", tScoreObj.TimeLimit));
    }
}  
