piSession = function() {
    var A = "https://pi.pearsoned.com/v1/piapi/login";
    var a2 = "3.20.0";
    var w = null;
    var aV = "pi_op_frame";
    var g = "pi_rp_frame";
    var e = "pi_user_id";
    var bA = A + "/html/checkSessionFrame.html?v=" + a2;
    var bp = false;
    var bl = 3 * 1000;
    var L = 30 * 60;
    var G = 5 * 60;
    var I = null;
    var c = null;
    var bw = null;
    var aN = null;
    var U = A + "/webchallenge";
    var ag = null;
    var y = false;
    var C = true;
    var bv = true;
    var K = false;
    var aH = 20;
    var bz = null;
    var au = null;
    var aD = "PiAuthExpiryTime";
    var ax = "PiAccessToken";
    var m = "PiAccessTokenExpiresIn";
    var aC = "PiAccessTokenTimestamp";
    var bf = "PiUserId";
    var bC = "PiLastUserActivityTime";
    var t = "PiIdpLoginUrl";
    var x = "PiIdpPartnerName";
    var a0 = "PiHomeCountryCode";
    var av = "PiSessionId";
    var V = "PiIdpLogoutCallback";
    var aB = "PiAuthSessionExpiryTime";
    var bd = "initialize";
    var ap = "checkSession";
    var l = "sessionState";
    var aa = "getinitialtoken";
    var aP = "updateuseractivitytime";
    var a6 = "updateuseractivitytimewithoffset";
    var s = "getConsent";
    var a5 = "refresh";
    var ad = "logout";
    var a7 = "setoptions";
    var O = "odf1";
    var aq = "odf1cb";
    var bg = "sessionTimingOut";
    var ae = "sessionRejuvenated";
    var H = "sessionTimedOut";
    var aM = null;
    var ao = 60;
    var bs = null;
    var am = null;
    var aG = false;
    var bo = null;
    var aT = null;
    var a9 = undefined;
    var bm = false;
    var k = undefined;
    var ac = null;
    var F = encodeURIComponent;
    var br = window.localStorage;

    function a(bD) {
        var bG = bD || function() {};
        var bF = document.createElement("style");
        bF.type = "text/css";
        bF.innerHTML = "iframe.hidden {display:none}";
        document.head.appendChild(bF);

        function bE(bI) {
            var bK = document.getElementById(bI.targetId) || document.body;
            var bJ = document.getElementById(bI.attributes.id);
            if (bK && !bJ) {
                bJ = document.createElement("iframe");
                var bH = null;
                for (bH in bI.attributes) {
                    if (bI.attributes.hasOwnProperty(bH)) {
                        bJ.setAttribute(bH, bI.attributes[bH])
                    }
                }
                bK.appendChild(bJ)
            }
            return bJ
        }
        bE({
            attributes: {
                id: aV,
                src: bA,
                tabindex: -1,
                width: 0,
                height: 0,
                "class": "hidden",
                title: ""
            }
        }).onload = bG;
        bE({
            attributes: {
                id: g,
                tabindex: -1,
                width: 0,
                height: 0,
                "class": "hidden",
                title: ""
            }
        })
    }

    function be() {
        return document.getElementById(aV)
    }

    function Q() {
        return document.getElementById(g)
    }

    function S() {
        return document.getElementById(e)
    }

    function bk(bD) {
        return w + "." + bD
    }

    function J(bD) {
        return b(bk(bD))
    }

    function aQ(bD, bE) {
        return aK(bk(bD), bE)
    }

    function bx() {
        return J(ax)
    }

    function by() {
        return J(bf)
    }

    function r() {
        var bD = parseInt(J(m));
        return bD || 0
    }

    function an(bE) {
        var bD = B(J(aC));
        if (!bD) {
            return null
        }
        var bF = aL(r());
        if (bE) {
            bF /= 2
        }
        return new Date(bD.getTime() + bF)
    }

    function W() {
        return aM
    }

    function aU() {
        return B(b(aB))
    }

    function B(bD) {
        if (bD) {
            return new Date(bD)
        }
        return null
    }

    function aL(bD) {
        if (bD) {
            return bD * 1000
        }
        return null
    }

    function Z(bD, bF) {
        if (bD == null) {
            return false
        }
        var bE = new Date();
        if ((bD.getTime() - bE.getTime()) > bF * 1000) {
            return true
        }
        return false
    }

    function ba() {
        var bE = an(true);
        if (!bE) {
            return null
        }
        var bD = new Date();
        var bF = bE.getTime() - bD.getTime();
        if (bF < 0) {
            bF = 0
        }
        return bF
    }

    function Y() {
        if (G) {
            return G + (bl / 1000)
        }
        return null
    }

    function aI(bD) {
        return Math.floor((Math.random() * bD + 1))
    }

    function ak(bD) {
        if (!bp) {
            return piSession.Unknown
        }
        if (!Z(aU(), bD)) {
            return piSession.NoSession
        }
        if (!Z(an(), bD)) {
            return piSession.NoToken
        }
        return piSession.Success
    }

    function bt() {
        aj(ap);
        bn()
    }
    var d = null;

    function bn(bD) {
        if (d && bD) {
            clearInterval(d);
            d = null
        }
        if (!d) {
            d = setInterval(bt, bl)
        }
    }

    function aw(bD) {
        return bD || bz || window.location.href
    }

    function E(bE) {
        if (!bE) {
            bE = window.location.href
        }
        var bD = ag || I || U;
        bD = n(bD, "client_id", F(w));
        bD = n(bD, "login_success_url", F(bE));
        if (aG) {
            bD = n(bD, "timedout", F(aG))
        }
        if (au) {
            bD = n(bD, "lang", F(au))
        }
        window.location.assign(bD)
    }

    function aF(bE, bF) {
        var bD = A + "/showconsent?escrowTicket=" + F(bE) + "&client_id=" + F(w) + "&login_success_url=" + F(bF);
        window.location.assign(bD)
    }

    function T(bD) {
        aj(ad, {
            logoutCallback: bD
        })
    }

    function bj(bE, bH) {
        var bG = document.createElement("form");
        bG.action = bE;
        bG.method = "POST";
        for (var bF in bH) {
            if (bH.hasOwnProperty(bF)) {
                var bD = document.createElement("input");
                bD.type = "hidden";
                bD.name = bF;
                bD.value = bH[bF];
                bG.appendChild(bD)
            }
        }
        document.getElementsByTagName("body")[0].appendChild(bG);
        bG.submit()
    }
    var aA = function(bI, bG, bD, bH) {
        if (bI != "" && bG != "") {
            var bE = {};
            bE.username = bI;
            bE.password = bG;
            bE.client_id = bD;
            bE.login_success_url = bH;
            bE.auto_login = "autologin";
            var bF = A + "/autologin";
            bF = au ? n(bF, "lang", au) : bF;
            bj(bF, bE)
        } else {
            E(bH)
        }
    };
    var v = function(bG, bF) {
        if (bG != "") {
            var bD = {};
            bD.username = bG;
            bD.client_id = w;
            bD.login_success_url = bF;
            var bE = A + "/autoimpersonate";
            bE = au ? n(bE, "lang", au) : bE;
            bj(bE, bD)
        } else {
            E(bF)
        }
    };
    var aX = function(bI, bE, bG, bF) {
        var bD = A + "/createSmsSession/";
        var bJ = window.location.href;
        if (ak(0) == piSession.NoSession || piSession.unKnown) {
            E(bJ)
        } else {
            var bH = false;
            if (bI != null) {
                bD += "?okurl=" + bI;
                bH = true
            }
            if (bE != null) {
                if (bH) {
                    bD += "&errurl=" + bE
                } else {
                    bD += "?errurl=" + bE;
                    bH = true
                }
            }
            if (bG) {
                if (bH) {
                    bD += "&siteid=" + bG
                } else {
                    bD += "?siteid=" + bG;
                    bH = true
                }
            }
            if (bF) {
                if (bH) {
                    bD += "&iscourseaware=" + bF
                } else {
                    bD += "?iscourseaware=" + bF;
                    bH = true
                }
            }
            window.location.assign(bD)
        }
    };

    function at(bE, bF, bD) {
        M(aa, bF, bD, bx, {
            login_success_url: bE
        })
    }

    function q(bE, bD) {
        M(a5, bE, bD, bx)
    }

    function o() {
        if (aZ) {
            clearTimeout(aZ);
            aZ = null
        }
    }
    var aZ = null;

    function bu() {
        if (!C) {
            return
        }
        o();
        var bF = ba();
        if (bF == null) {
            return
        }
        var bD = aH;
        var bE = bF + aI(250);
        aZ = setTimeout(function() {
            aZ = null;
            bF = ba();
            if (bF == null) {
                return
            }
            if (bF > 0) {
                bu()
            } else {
                q(function(bG, bH) {
                    if (bG == piSession.TimedOut) {
                        bu()
                    }
                }, bD)
            }
        }, bE)
    }

    function z(bD, bE) {
        Q().addEventListener(bD, bE, false)
    }

    function j(bD, bE) {
        Q().removeEventListener(bD, bE, false)
    }

    function a3(bD, bF) {
        var bE = document.createEvent("Event");
        bE.initEvent(bD, true, true);
        bE.data = bF;
        Q().dispatchEvent(bE)
    }
    var D = [];
    var bh = {};
    var bc = function(bJ, bE, bG) {
        var bD = "event" + Math.random();

        function bF() {
            return bh[bD]
        }

        function bH() {
            var bK = bF(bD);
            if (bK) {
                if (bK.timeoutTimer != null) {
                    clearTimeout(bK.timeoutTimer)
                }
                if (bK.successHandler != null) {
                    piSession.off(bD, bK.successHandler)
                }
                delete bh[bD]
            }
        }
        var bI = {};
        bh[bD] = bI;
        if (bE) {
            bI.timeoutTimer = setTimeout(function() {
                bH(bD);
                if (bJ) {
                    bJ(piSession.TimedOut, null)
                }
            }, bE)
        }
        bI.successHandler = function(bL) {
            bH();
            var bK = bL.data;
            if (bG) {
                bK = bG(bK)
            }
            if (bJ) {
                bJ(piSession.Success, bK)
            }
        };
        piSession.on(bD, bI.successHandler);
        return bD
    };

    function h(bG, bD, bF) {
        var bE = bc(bG, aL(bD), bF);
        D.push(bE)
    }

    function M(bD, bI, bE, bG, bH) {
        var bF = bc(bI, aL(bE), bG);
        aj(bD, bH, bF)
    }

    function aj(bD, bG, bE) {
        var bF = be();
        bF.contentWindow.postMessage(JSON.stringify({
            operation: bD,
            data: bG,
            eventId: bE
        }), bA)
    }

    function bB(bF) {
        var bD = bF.data.logoutCallback;
        if (bD) {
            window.location.assign(bD)
        } else {
            if (c) {
                if (aN) {
                    window.location.assign(aN)
                } else {
                    var bE = A + "/showIdpLogout?client_id=" + F(w) + "&idpPartnerName=" + c;
                    if (I) {
                        bE += "&idpLoginUrl=" + I
                    }
                    if (au) {
                        bE += "&lang=" + au
                    }
                    window.location.assign(bE)
                }
            }
        }
    }

    function ar() {
        var bD = A + "/showIdpLogout?client_id=" + F(w);
        if (c) {
            bD += "&idpPartnerName=" + c
        }
        if (I) {
            bD += "&idpLoginUrl=" + I
        }
        window.location.assign(bD)
    }

    function i(b0) {
        var bF = /http[s]?:\/\/([^/]+).*/;
        var bY = (b0.origin).replace(bF, "$1");
        var bE = A.replace(bF, "$1");
        if (bY !== bE) {
            return
        }
        try {
            var bJ = JSON.parse(b0.data);
            if (typeof(bJ) !== "object") {
                return
            }
        } catch (bZ) {
            return
        }
        var bP = bJ.data;
        var bT = bJ.eventId;
        if (bJ.operation === l) {
            var bX = false;
            var bM = false;
            var bO = bP[aD];
            var bR = a9;
            var bL = k;
            var bH = bP[bf];
            if (bO) {
                if (bR == false) {
                    bX = true
                }
                a9 = true;
                aG = false
            } else {
                if (bR == true) {
                    bM = true
                }
                a9 = false;
                if (y) {
                    E(aw());
                    return
                }
            }

            function bN(b3, b2) {
                aQ(b2, bP[b2])
            }
            aK(aB, bO);
            bN(bP, ax);
            bN(bP, m);
            bN(bP, aC);
            bN(bP, bf);
            bN(bP, a0);
            bN(bP, av);
            aM = bP[bC];
            var bS = bP[t];
            if (bS != null) {
                I = bS
            }
            var bD = bP[x];
            if (bD != null) {
                c = bD
            }
            var bU = bP[V];
            if (bU != null) {
                aN = bU
            }
            if (!bp) {
                bp = true;
                var bK = bO != null;
                while (D.length > 0) {
                    var bV = D.pop();
                    a3(bV, bK)
                }
                a3(piSession.SessionStateKnownEvent, bK)
            }
            k = bx();
            var bG = k;
            var bI = (bG && bG != bL);
            if (bI || bX) {
                bu()
            }
            if (bI) {
                a3(piSession.RefreshEvent, bG)
            }
            if (bX) {
                ab();
                a3(piSession.LoginEvent)
            }
            if (bM) {
                o();
                a3(piSession.LogoutEvent, bP);
                piSession.hideSessionTimingOutWarningModal(null)
            }
            if (bT) {
                a3(bT)
            }
            var bQ = S();
            if (bQ) {
                ac = bQ.value
            }
            if (!ac) {
                if (bQ) {
                    bQ.value = bH
                }
                ac = bH
            } else {
                if (bH != null && ac != bH) {
                    ar()
                }
            }
            bn()
        } else {
            if (bJ.operation === s) {
                var b1 = bP.escrowTicket;
                var bW = bP.login_success_url;
                aF(b1, bW)
            } else {
                if (bJ.operation === aq) {
                    a3(bT, bP)
                } else {
                    if (bJ.operation === bg) {
                        a3(piSession.SessionTimingOutEvent, bP)
                    } else {
                        if (bJ.operation === ae) {
                            a3(piSession.SessionRejuvenatedEvent, bP)
                        } else {
                            if (bJ.operation === H) {
                                aG = true;
                                a3(piSession.SessionTimedOutEvent, bP)
                            }
                        }
                    }
                }
            }
        }
    }
    var p = function() {
        var bD = (typeof(br) !== "undefined");
        if (bD) {
            var bE = "__testLocalStorage__";
            try {
                br.setItem(bE, 1);
                br.removeItem(bE)
            } catch (bF) {
                bD = false
            }
        }
        if (!bD) {
            br = {
                getItem: function(bI) {
                    var bH = bI + "=";
                    var bG = document.cookie.split(";");
                    for (var bJ = 0; bJ < bG.length; bJ++) {
                        var bK = bG[bJ];
                        while (bK.charAt(0) == " ") {
                            bK = bK.substring(1)
                        }
                        if (bK.indexOf(bH) != -1) {
                            return bK.substring(bH.length, bK.length)
                        }
                    }
                    return null
                },
                setItem: function(bG, bH) {
                    document.cookie = bG + "=" + bH + ";Path=/;"
                },
                removeItem: function(bG) {
                    document.cookie = bG + "=;Path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;"
                }
            }
        }
    };

    function aK(bD, bE) {
        if (typeof(bE) === "undefined" || bE === null) {
            br.removeItem(bD)
        } else {
            br.setItem(bD, bE)
        }
    }

    function b(bD) {
        if (!bp) {
            return null
        }
        return br.getItem(bD)
    }

    function X() {
        window.addEventListener("message", i, false);
        window.addEventListener(piSession.LogoutEvent, bB, false)
    }

    function aO(bD) {
        alert(bD);
        throw bD
    }

    function aY(bD) {
        alert(bD);
        console.error(bD)
    }
    var R = false;

    function al(bD, bE) {
        if (R) {
            aO("piSession.initialize() already called")
        }
        if (!bD) {
            aO("piSession.initialize() requires clientId")
        }
        w = bD;
        p();
        if (bE && typeof(bE) == "number") {
            bE = {
                checkSessionMilliseconds: bE
            }
        }
        ai(bE);
        X();
        a(function() {
            aj(bd, {
                client_id: w,
                server_root: A,
                sessionIdleTimeoutSeconds: L,
                sessionIdleTimeoutWarningSeconds: Y()
            });
            bt();
            az(K)
        });
        R = true
    }

    function ai(bE) {
        if (bE) {
            if (bE.checkSessionMilliseconds) {
                bl = bE.checkSessionMilliseconds
            }
            if (bE.sessionIdleTimeoutWarningSeconds != null) {
                G = Number(bE.sessionIdleTimeoutWarningSeconds) || 0
            }
            if (bE.sessionIdleTimeoutSeconds != null) {
                L = Number(bE.sessionIdleTimeoutSeconds) || 0
            }
            var bG = G ? Math.ceil((bl * 4) / 1000) : 0;
            var bD = Math.ceil((bl * 2) / 1000);
            var bF = L - bD;
            if (L < bG) {
                aY("sessionIdleTimeoutSeconds must be at least " + bG + " for the current setting of checkSessionMilliseconds.  Setting to minimum allowed.");
                L = bG
            }
            if (G) {
                if (G < bD) {
                    aY("sessionIdleTimeoutWarningSeconds must be at least " + bD + " for the current setting of checkSessionMilliseconds.  Disabling warning.");
                    G = null
                } else {
                    if (G > bF) {
                        aY("sessionIdleTimeoutWarningSeconds must be no more than " + bF + " for the current setting of sessionIdleTimeoutSeconds and checkSessionMilliseconds.  Disabling warning.");
                        G = null
                    }
                }
            }
            if (bE.useDefaultIdleTimoutWarningPopup != null) {
                K = bE.useDefaultIdleTimoutWarningPopup
            }
            if (bE.requireLogin != null) {
                y = bE.requireLogin
            }
            if (bE.autoRefresh != null) {
                C = bE.autoRefresh
            }
            if (bE.monitorUserActivity != null) {
                bv = bE.monitorUserActivity
            }
            if (bE.idpId != null) {
                bw = bE.idpId;
                if (bw) {
                    ag = A + "/federate/" + F(bw)
                } else {
                    ag = null
                }
            }
            if (bE.defaultTimeoutSeconds != null) {
                aH = bE.defaultTimeoutSeconds
            }
            if (bE.loginSuccessUrl != null) {
                bz = bE.loginSuccessUrl
            }
            if (bE.lang != null) {
                au = bE.lang
            }
            aE(bv)
        }
    }

    function ab() {
        aj(aP)
    }

    function ah() {
        aW(ao)
    }

    function aW(bD) {
        aj(a6, {
            dateNowOffsetMinutes: bD
        })
    }

    function aE(bE) {
        if (bE == bm) {
            return
        }

        function bD(bF) {
            if (bE) {
                window.addEventListener(bF, ab, false)
            } else {
                window.removeEventListener(bF, ab, false)
            }
        }
        bD("keydown");
        bD("mousedown");
        bD("paste");
        bD("cut");
        bD("wheel");
        bm = bE
    }

    function P() {
        return bm
    }

    function f(bD) {
        piSession.showSessionTimingOutWarningModal(bD.data)
    }

    function aR(bD) {
        piSession.hideSessionTimingOutWarningModal(bD.data)
    }

    function aJ(bD) {
        piSession.showSessionTimedOutModal(bD.data)
    }

    function az(bD) {
        var bE = bD ? z : j;
        bE(piSession.SessionTimingOutEvent, f);
        bE(piSession.SessionRejuvenatedEvent, aR);
        bE(piSession.SessionTimedOutEvent, aJ)
    }

    function bi() {
        if (!bs) {
            document.body.insertAdjacentHTML("beforeend", "<style>\n.piSessionTimeoutModal {\n\tdisplay: none;\n\tposition: fixed;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tfont-family: \'Open Sans\', Calibri, Tahoma, sans-serif;\n}\n\nbody.piModalShown {\n    overflow: hidden;\n    pointer-events: none;\n}\n\n.piSessionTimeoutModal>div.piModalOverlay {\n\tposition: fixed;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: #252525;\n\topacity: 0.6;\n\tz-index: 1000;\n}\n\n.piSessionTimeoutModal .piModalHeader {\n\tfont-weight: normal;\n\tmargin: 0;\n}\n\n.piSessionTimeoutModal>div.piModalBody {\n\tposition: relative;\n\ttop: 50%;\n\ttransform: translateY(-50%);\n        -ms-transform: translate(0%, -50%); \/* IE 9 *\/\n        -webkit-transform: translate(0%, -50%); \/* Safari and Chrome *\/\n\tbackground-color: #fff;\n\tborder: 1px solid #000;\n\tz-index: 1001;\n\t-webkit-border-radius: 2px;\n\t-moz-border-radius: 2px;\n\tborder-radius: 2px;\n\t-webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);\n\t-moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);\n\tbox-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);\n\t-webkit-background-clip: padding-box;\n\t-moz-background-clip: padding-box;\n\tbackground-clip: padding-box;\n\toutline: none;\n\ttext-align: left;\n\tfont-size: 14px;\n\ttransform: translateY(-50%);\n    pointer-events: auto;\n}\n\n.piSessionTimeoutModal div.piModalActions {\n\ttext-align: right;\n}\n\n.piSessionTimeoutModal div.piModalActions button {\n\theight: 36px;\n\tpadding: 0 12px;\n\tmargin: 4px 8px;\n\t-webkit-border-radius: 2px;\n\t-moz-border-radius: 2px;\n\tborder-radius: 2px;\n\tcolor: #252525;\n\tbackground-color: #e9e9e9;\n\tborder-style: solid;\n\tborder-color: #c7c7c7;\n\tfont-weight: bold;\n}\n\n.piSessionTimeoutModal div.piModalActions button.piModalButtonDefault {\n\tcolor: white;\n\tbackground-color: #047a9c;\n\tborder-style: none;\n}\n\n.piModalSessionTimeLeft {\n\tfont-weight: bold;\n\tfont-size: larger;\n}\n\n@media ( min-width :768px) {\n\t.piSessionTimeoutModal .piModalHeader {\n\t\tfont-size: 24px;\n\t}\n\t.piSessionTimeoutModal>div.piModalBody {\n\t\twidth: 600px;\n\t\tmargin: auto;\n\t\tpadding: 40px;\n\t}\n\t.piSessionTimeoutModal div.piModalContent {\n\t\tpadding: 20px 0 0;\n\t}\n\t.piSessionTimeoutModal div.piModalActions {\n\t\tpadding: 28px 0 0;\n\t}\n}\n\n@media ( min-width :480px) and (max-width:767px) {\n\t.piSessionTimeoutModal .piModalHeader {\n\t\tfont-size: 20px;\n\t}\n\t.piSessionTimeoutModal>div.piModalBody {\n\t\twidth: 440px;\n\t\tmargin: auto;\n\t\tpadding: 20px 24px;\n\t}\n\t.piSessionTimeoutModal div.piModalContent {\n\t\tpadding: 16px 0 0;\n\t}\n\t.piSessionTimeoutModal div.piModalActions {\n\t\tpadding: 24px 0 0;\n        display: flex;\n    flex-wrap: wrap\n\t}\n    .piSessionTimeoutModal div.piModalActions button {\n        flex: 1 0 auto;\n    }\n}\n\n@media ( min-width :1px) and (max-width:479px) {\n\t.piSessionTimeoutModal .piModalHeader {\n\t\tfont-size: 20px;\n\t}\n\t.piSessionTimeoutModal>div.piModalBody {\n\t\twidth: auto;\n\t\tmargin: auto;\n\t\tpadding: 20px 24px;\n\t}\n\t.piSessionTimeoutModal div.piModalContent {\n\t\tpadding: 16px 0 0;\n\t}\n\t.piSessionTimeoutModal div.piModalActions {\n\t\tpadding: 0;\n        display: flex;\n    flex-wrap: wrap\n\t}\n    .piSessionTimeoutModal div.piModalActions button {\n        flex: 1 0 auto;\n    }\n}\n<\/style>\n\n<div id=\"piSessionTimingOutModal\" class=\"piSessionTimeoutModal\">\n  <div class=\"piModalOverlay\" tabindex=\"-1\"><\/div>\n  <div class=\"piModalBody\" role=\"dialog\" aria-labelledby=\"piModalTimingOutTitle\" aria-describedby=\"piModalTimingOutDescription\">\n    <h2 class=\"piModalHeader\" id=\"piModalTimingOutTitle\">Are you still there?<\/h2>\n    <p class=\"piModalContent\" id=\"piModalTimingOutDescription\">Your session will time out in <span class=\"piModalSessionTimeLeft\"><\/span> due to inactivity. Would you like to stay signed in?<\/p>\n    <div class=\"piModalActions\">\n      <button class=\"piSignOut\">Sign Out<\/button>\n      <button class=\"piRecordUserActivity piModalButtonDefault\">Keep me signed in<\/button>\n    <\/div>\n  <\/div>\n<\/div>\n\n<div id=\"piSessionTimedOutModal\" class=\"piSessionTimeoutModal\">\n  <div class=\"piModalOverlay\" tabindex=\"-1\"><\/div>\n  <div class=\"piModalBody\" role=\"dialog\" aria-labelledby=\"piModalTimedOutTitle\" aria-describedby=\"piModalTimedOutDescription\">\n    <h2 class=\"piModalHeader\" id=\"piModalTimedOutTitle\">Session timed out<\/h2>\n    <p class=\"piModalContent\" id=\"piModalTimedOutDescription\">Your session has timed out due to inactivity.<\/p>\n    <div class=\"piModalActions\">\n      <button class=\"piContinue piModalButtonDefault\">Continue<\/button>\n    <\/div>\n  <\/div>\n<\/div>\n");
            bs = document.getElementById("piSessionTimingOutModal");
            am = document.getElementById("piSessionTimedOutModal");
            document.querySelector("#piSessionTimingOutModal button.piSignOut").onclick = function(bD) {
                piSession.logout();
                piSession.hideSessionTimingOutWarningModal()
            };
            document.querySelector("#piSessionTimingOutModal button.piRecordUserActivity").onclick = function(bD) {
                piSession.recordUserActivity();
                piSession.hideSessionTimingOutWarningModal()
            };
            document.querySelector("#piSessionTimedOutModal button.piContinue").onclick = function(bD) {
                piSession.hideSessionTimedOutModal()
            }
        }
    }
    var a4 = null;
    var bq = null;
    var af = "keydown";
    var bb = "piModalShown";

    function a8() {
        a4 = document.activeElement
    }

    function ay() {
        if (bq) {
            document.removeEventListener(af, bq);
            bq = null;
            document.body.classList.remove(bb)
        }
        if (a4) {
            a4.focus();
            a4 = null
        }
    }

    function N(bD) {
        var bE = bD.querySelector(".piModalButtonDefault");
        bq = function(bL) {
            var bM = 9;
            var bK = 27;
            var bG = bD.querySelectorAll("button,input,checkbox");
            var bF = bG[0];
            var bI = bG[bG.length - 1];

            function bJ() {
                if (document.activeElement === bF) {
                    bL.preventDefault();
                    bI.focus()
                }
            }

            function bH() {
                if (document.activeElement === bI) {
                    bL.preventDefault();
                    bF.focus()
                }
            }
            switch (bL.keyCode) {
                case bK:
                    bE.click();
                    break;
                case bM:
                    if (bG.length === 1) {
                        bL.preventDefault();
                        break
                    }
                    if (bL.shiftKey) {
                        bJ()
                    } else {
                        bH()
                    }
                    break;
                default:
                    break
            }
        };
        document.addEventListener(af, bq);
        document.body.classList.add(bb);
        bE.focus()
    }

    function aS() {
        if (!R) {
            aO("piSession.initialize() has not been invoked")
        }
    }

    function a1(bE) {
        var bF = null;
        var bD;
        (window.onpopstate = function() {
            var bG, bI = /\+/g,
                bH = /([^&=]+)=?([^&]*)/g,
                bK = function(bL) {
                    return decodeURIComponent(bL.replace(bI, " "))
                },
                bJ = window.location.search.substring(1);
            bD = {};
            while (bG = bH.exec(bJ)) {
                bD[bK(bG[1])] = bK(bG[2])
            }
        })();
        if (bE in bD) {
            bF = bD[bE]
        }
        return bF
    }

    function n(bF, bD, bG) {
        var bE = new RegExp("([?|&])" + bD + "=.*?(&|#|$)", "i");
        if (bF.match(bE)) {
            return bF.replace(bE, "$1" + bD + "=" + bG + "$2")
        } else {
            var bI = "";
            var bH = bF.indexOf("?") !== -1 ? "&" : "?";
            if (bF.indexOf("#") !== -1) {
                bI = bF.replace(/.*#/, "#");
                bF = bF.replace(/#.*/, "")
            }
            return bF + bH + bD + "=" + bG + bI
        }
    }
    var u = function(bE) {
        var bG = bE + "=";
        var bD = document.cookie.split(";");
        for (var bF = 0; bF < bD.length; bF++) {
            var bH = bD[bF];
            while (bH.charAt(0) == " ") {
                bH = bH.substring(1, bH.length)
            }
            if (bH.indexOf(bG) == 0) {
                return bH.substring(bG.length, bH.length)
            }
        }
        return null
    };
    return {
        Unknown: "unknown",
        NoSession: "nosession",
        NoToken: "notoken",
        RequiredLifetimeTooLong: "requiredLifetimeTooLong",
        Success: "success",
        TimedOut: "timedout",
        SessionStateKnownEvent: "sessionstateknown",
        LoginEvent: "login",
        LogoutEvent: "logout",
        RefreshEvent: "refresh",
        ErrorEvent: "error",
        SessionTimingOutEvent: "sessionTimingOut",
        SessionRejuvenatedEvent: "sessionRejuvenated",
        SessionTimedOutEvent: "sessionTimedOut",
        initialize: function(bD, bE) {
            al(bD, bE)
        },
        login: function(bF, bG, bH) {
            aS();
            bG = Number(bG) || 0;
            bF = aw(bF);

            function bE() {
                var bI = ak(bG);
                if (bI == piSession.Success) {
                    if (bH) {
                        bH(bI, bx())
                    }
                    return bI
                }
                if (bI == piSession.NoToken) {
                    at(bF, bH, aH);
                    return bI
                }
                E(bF);
                return piSession.NoSession
            }
            var bD = ak(0);
            if (bD == piSession.Unknown) {
                h(bE, null);
                return bD
            } else {
                return bE()
            }
        },
        logout: function(bD) {
            aS();
            T(bD)
        },
        autologin: function(bG, bE, bD, bF) {
            aS();
            aA(bG, bE, bD, bF)
        },
        autoimpersonate: function(bE, bD) {
            aS();
            v(bE, bD)
        },
        getsmssession: function(bG, bD, bF, bE) {
            aS();
            aX(bG, bD, bF, bE)
        },
        hasValidSession: function(bD) {
            aS();
            return ak(bD)
        },
        getToken: function(bH, bG, bE) {
            aS();
            bG = bG || 0;
            bE = bE || aH;

            function bD() {
                if (Z(an(), bG)) {
                    bH(piSession.Success, bx())
                } else {
                    if (bx()) {
                        if (bG > r()) {
                            bH(piSession.RequiredLifetimeTooLong, null)
                        } else {
                            q(bH, bE)
                        }
                    } else {
                        bH(piSession.NoToken, null)
                    }
                }
            }

            function bF() {
                var bI = ak(0);
                if (!bI) {
                    bH(piSession.NoSession, null)
                } else {
                    bD()
                }
            }
            if (ak(0) == piSession.Unknown) {
                h(bF, bE)
            } else {
                bF()
            }
        },
        recordUserActivity: function() {
            aS();
            ab()
        },
        monitorUserActivity: function(bD) {
            aS();
            aE(bD)
        },
        extendUserSession: function() {
            aS();
            ah()
        },
        currentToken: function() {
            aS();
            return bx()
        },
        doNotUseThisDeprecatedMethod: function(bD) {
            M(O, bD, 10);
            return null
        },
        userId: function() {
            aS();
            return by()
        },
        currentSessionExpiry: function() {
            aS();
            return aU()
        },
        currentTokenExpiry: function() {
            aS();
            return an()
        },
        currentLastUserActivityTime: function() {
            aS();
            return W()
        },
        isUserEventMonitoringActive: function() {
            aS();
            return P()
        },
        setOptions: function(bD) {
            aS();
            ai(bD);
            bn(true);
            aj(a7, {
                sessionIdleTimeoutSeconds: L,
                sessionIdleTimeoutWarningSeconds: Y()
            });
            az(K)
        },
        showSessionTimingOutWarningModal: function(bF) {
            aS();
            var bE = new Date(bF).getTime();

            function bD() {
                var bJ = Math.max(0, bE - new Date().getTime());
                var bI = new Date(bJ).toISOString().substr(11, 8);
                if (bI.startsWith("00:")) {
                    bI = bI.substring(3)
                }
                document.querySelector("#piSessionTimingOutModal .piModalSessionTimeLeft").innerHTML = bI;
                return bJ
            }
            bi();
            piSession.hideSessionTimedOutModal();
            var bG = bD();
            var bH = bG - (G * 1000) - 500;
            bo = setInterval(function() {
                bD()
            }, 1000);
            aT = setTimeout(function() {
                aT = null;
                a8();
                bD();
                bs.style.display = "block";
                N(bs)
            }, bH)
        },
        hideSessionTimingOutWarningModal: function(bD) {
            aS();
            if (aT) {
                clearTimeout(aT);
                aT = null
            }
            if (bs && bs.style.display !== "none") {
                bs.style.display = "none";
                ay()
            }
            if (bo) {
                clearInterval(bo);
                bo = null
            }
        },
        showSessionTimedOutModal: function(bD) {
            aS();
            bi();
            piSession.hideSessionTimingOutWarningModal();
            a8();
            am.style.display = "block";
            N(am)
        },
        hideSessionTimedOutModal: function() {
            aS();
            if (am && am.style.display !== "none") {
                am.style.display = "none";
                ay()
            }
        },
        on: function(bD, bE) {
            aS();
            z(bD, bE)
        },
        off: function(bD, bE) {
            aS();
            j(bD, bE)
        },
        trigger: function(bD, bE) {
            aS();
            a3(bD, bE)
        },
        getHomeCountryCode: function() {
            aS();
            if (ak(0) == piSession.Success) {
                return J(a0)
            } else {
                return ""
            }
        },
        getContextId: function() {
            aS();
            if (ak(0) == piSession.Success) {
                return J(av)
            } else {
                return ""
            }
        }
    }
}();