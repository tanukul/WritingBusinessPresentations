//Objective Definitions- Pls do not add other code to this block
var ObjectiveDefinitions = [
    {
        Id: "1",
        CustomTarget: "qualsims/management/fom_planning/",
        Title: "",
        ObjectiveDetails: [
            {
                Id: "LO1",
                Name: "LO 12.1",
                TargetLink: "",
                Title: "Highlight the importance of presentations in your business career, and explain how to adapt the planning step of the three-step process to presentations.",
                PageIds: ['l1p2', 'l1p3', 'l1p4', 'l1p5', 'l1p8', 'l1p9', 'l1p10', 'l1p11', 'l1p12', 'l1p13', 'l1p14', 'l1p15']
            },
            {
                Id: "LO2",
                Name: "LO 12.2",
                TargetLink: "",
                Title: "Describe the tasks involved in developing a presentation.",
                PageIds: ['l1p24', 'l1p16', 'l1p17', 'l1p18', 'l1p19']
            },
            {
                Id: "LO3",
                Name: "LO 12.4",
                TargetLink: "",
                Title: "Outline four key tasks involved in completing a presentation. ",
                PageIds: ['l1p20', 'l1p21', 'l1p22', 'l1p23']
            }        
            

        ]
    },
    {
        Id: "2",
        CustomTarget: "qualsims/management/fom_planning/",
        Title: "",
        ObjectiveDetails: [
            {
                Id: "LO1",
                Name: "LO 14.1",
                TargetLink: "",
                Title: "Highlight the importance of presentations in your business career, and explain how to adapt the planning step of the three-step process to presentations.",
                PageIds: ['l1p2', 'l1p3', 'l1p4', 'l1p5', 'l1p8', 'l1p9', 'l1p10', 'l1p11', 'l1p12', 'l1p13', 'l1p14', 'l1p15']
            },
            {
                Id: "LO2",
                Name: "LO 14.2",
                TargetLink: "",
                Title: "Describe the tasks involved in developing a presentation.",
                PageIds: ['l1p24', 'l1p16', 'l1p17', 'l1p18', 'l1p19']
            },
            {
                Id: "LO3",
                Name: "LO 14.4",
                TargetLink: "",
                Title: "Outline four major tasks involved in completing a presentation. ",
                PageIds: ['l1p20', 'l1p21', 'l1p22', 'l1p23']
            }        
            

        ]
    },
    {
        Id: "3",
        CustomTarget: "qualsims/management/fom_planning/",
        Title: "",
        ObjectiveDetails: [
            {
                Id: "LO1",
                Name: "LO 16.1",
                TargetLink: "",
                Title: "Describe the tasks involved in analyzing the situation for a presentation and organizing a presentation.",
                PageIds: ['l1p2', 'l1p3', 'l1p4', 'l1p5', 'l1p8', 'l1p9', 'l1p10', 'l1p11', 'l1p12', 'l1p13', 'l1p14', 'l1p15']
            },
            {
                Id: "LO2",
                Name: "LO 16.2",
                TargetLink: "",
                Title: "Explain how to adapt to your audience and develop an effective opening, body, and close for a presentation.",
                PageIds: ['l1p24', 'l1p16', 'l1p17', 'l1p18', 'l1p19']
            },
            {
                Id: "LO3",
                Name: "LO 16.3",
                TargetLink: "",
                Title: "Discuss five steps for delivering a successful presentation.",
                PageIds: ['l1p20', 'l1p21', 'l1p22', 'l1p23']
            }        
            

        ]
    },
    {
        Id: "4",
        CustomTarget: "qualsims/management/fom_planning/",
        Title: "",
        ObjectiveDetails: [
            {
                Id: "LO1",
                Name: "SQ4.1",
                TargetLink: "",
                Title: "What do you analyze when planning a business presentation?",
                PageIds: ['l1p2', 'l1p3', 'l1p4', 'l1p5', 'l1p8', 'l1p9']
            },
            {
                Id: "LO2",
                Name: "SQ4.2",
                TargetLink: "",
                Title: "How do you compose the presentation?",
                PageIds: ['l1p24', 'l1p16', 'l1p17', 'l1p18', 'l1p19']
            },
            {
                Id: "LO3",
                Name: "SQ4.3",
                TargetLink: "",
                Title: "How do you deliver and evaluate the presentation?",
                PageIds: ['l1p20', 'l1p21', 'l1p22', 'l1p23']
            }        
            

        ]
    }
    
]
var _ObjectiveManager = (function () {
    return{
        GetObjective: function(){
            return ObjectiveDefinitions;
        }
    };
})();
function getobj(targetid){
    var obj = undefined;
    for(var k=0;k<ObjectiveDefinitions.length;k++){
        if(ObjectiveDefinitions[k].CustomTarget == targetid){
            obj = ObjectiveDefinitions[k];
            break;
        }
    }
    if (obj==undefined)
        obj = ObjectiveDefinitions[0];

    return obj;
}
function updateLearningObjectives(isSummary) {
    var _objectiveDefinitions = _Module.GetObjectiveDefinition().ObjectiveDetails;
            var objDefLength = _objectiveDefinitions.length;
            if (isSummary) {
                for (var n = 0; n < objDefLength; n++) {
                    var objDefIDLength = _objectiveDefinitions[n].PageIds.length;
                    for (var p = 0; p < objDefIDLength; p++) {
                        var pageID = _objectiveDefinitions[n].PageIds[p];
                        if (_objectiveDefinitions[n].TargetLink == "") {
                            var tempPHtml = '<div class="LOResultPMain"><div class="LOResultName"><p><strong>' + _objectiveDefinitions[n].Name + ': </strong>' + _objectiveDefinitions[n].Title + '</p><br></div><div class="LOResulteText"><p>Read more about it in the eText</p></div></div >';

                        } else {
                            var tempPHtml = '<div class="LOResultPMain"><div class="LOResultName"><p><strong>' + _objectiveDefinitions[n].Name + ': </strong>' + _objectiveDefinitions[n].Title + '</p><br></div><div class="LOResulteText"><p><a class="objLink" style="color: #000;" target="_blank" href="' + _objectiveDefinitions[n].TargetLink + '">Read more about it in the eText</a></p></div></div >';
                        }
                        $("div[LOquesid=" + pageID + "]").append(tempPHtml);
                    }
                }                
            } else {
                var tempLOHtml = "<nav><ul>"
                for (var n = 0; n < objDefLength; n++) {
                    tempLOHtml += "<li><strong>" + _objectiveDefinitions[n].Name + ": </strong>" + _objectiveDefinitions[n].Title + "</li>";
                }
                tempLOHtml += "</ul></nav>"
                $(".pagedesc-1").find("nav").remove();
                $(".resultPageDesc").find("nav").remove();
                $(".pagedesc-1").append(tempLOHtml);
                $(".resultPageDesc").append(tempLOHtml);
            }
}

/*ATUL old function
function updateLearningObjectives(isSummary) {
    for (var k = 0; k < ObjectiveDefinitions.length; k++) {
        var userName = ObjectiveDefinitions[k].CustomTarget.split("/")[ObjectiveDefinitions[k].CustomTarget.split("/").length - 1];
        if (userName == "") {
            var objDefLength = ObjectiveDefinitions[k].ObjectiveDetails.length;
            if (isSummary) {
                for (var n = 0; n < objDefLength; n++) {
                    var objDefIDLength = ObjectiveDefinitions[k].ObjectiveDetails[n].PageIds.length;
                    for (var p = 0; p < objDefIDLength; p++) {
                        var pageID = ObjectiveDefinitions[k].ObjectiveDetails[n].PageIds[p];
                        if (ObjectiveDefinitions[k].ObjectiveDetails[n].TargetLink == "") {
                            var tempPHtml = '<div class="LOResultPMain"><div class="LOResultName"><p><strong>' + ObjectiveDefinitions[k].ObjectiveDetails[n].Name + ': </strong>' + ObjectiveDefinitions[k].ObjectiveDetails[n].Title + '</p><br></div><div class="LOResulteText"><p>Read more about it in the eText</p></div></div >';

                        } else {
                            var tempPHtml = '<div class="LOResultPMain"><div class="LOResultName"><p><strong>' + ObjectiveDefinitions[k].ObjectiveDetails[n].Name + ': </strong>' + ObjectiveDefinitions[k].ObjectiveDetails[n].Title + '</p><br></div><div class="LOResulteText"><p><a class="objLink" style="color: #000;" target="_blank" href="' + ObjectiveDefinitions[k].ObjectiveDetails[n].TargetLink + '">Read more about it in the eText</a></p></div></div >';
                        }
                        $("div[LOquesid=" + pageID + "]").append(tempPHtml);
                    }
                }                
            } else {
                var tempLOHtml = "<nav><ul>"
                for (var n = 0; n < objDefLength; n++) {
                    tempLOHtml += "<li><strong>" + ObjectiveDefinitions[k].ObjectiveDetails[n].Name + ": </strong>" + ObjectiveDefinitions[k].ObjectiveDetails[n].Title + "</li>";
                }
                tempLOHtml += "</ul></nav>"
                $(".pagedesc-1").find("nav").remove();
                $(".resultPageDesc").find("nav").remove();
                $(".pagedesc-1").append(tempLOHtml);
                $(".resultPageDesc").append(tempLOHtml);
            }
        }        
    }
}*/