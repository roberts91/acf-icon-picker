! function(e) {
    var t = "https://www.googleapis.com/youtube/v3/",
        n = {
            prefix: "icon_picker",
            minChar: 3,
            searchDelay: 2,
            preview: !0,
            cloneField: !0,
            offset: {
                x: 0,
                y: 0
            },
            nanoScroller: {
                preventPageScrolling: !0
            },
            language: {
                buttons: {
                    preview: "Preview",
                    select: "Select",
                    close: "&times;"
                },
                labels: {
                    views: "Views",
                    noRecords: "No records",
                    loading: "Loading..."
                }
            }
        },
        i = {
            channelId: "",
            channelType: "",
            eventType: "",
            location: "",
            locationRadius: "",
            maxResults: 50,
            order: "relevance",
            publishedAfter: "",
            publishedBefore: "",
            regionCode: "",
            relatedVideoId: "",
            relevanceLanguage: "",
            safeSearch: "none",
            topicId: "",
            type: "video",
            videoCaption: "any",
            videoCategoryId: "",
            videoDefinition: "any",
            videoDimension: "any",
            videoDuration: "any",
            videoEmbeddable: "any",
            videoLicense: "any",
            videoSyndicated: "any",
            videoType: "any"
        },
        o = function(n, o) {
            var a, r, s, l = this,
                c = function(e) {
                    return e = e || "API_KEY", "object" == typeof n && n.hasOwnProperty(e) ? n[e] : !1
                },
                d = function() {
                    var e, t = {
                        key: c(),
                        part: "snippet",
                        pageToken: r || "",
                        q: s && s.hasOwnProperty("query") ? s.query : ""
                    };
                    for (e in i) i.hasOwnProperty(e) && o.hasOwnProperty(e) && o[e].toString().length && (t[e] = o[e]);
                    return o = t
                };
            this.doSearch = function() {
                if (arguments.length && (s = e.extend({}, {
                        query: "",
                        onLoadInit: !1,
                        onLoadComplete: !1,
                        onLoadError: !1
                    }, arguments[0]), s.query.length && c())) {
                    var n = this,
                        i = t + "search";
                    a = !1, d(), e.isFunction(s.onLoadInit) && s.onLoadInit.call(this, {
                        params: o,
                        url: i
                    }), e.getJSON(i, o, function(t) {
                        a = t, e.isFunction(s.onLoadComplete) && s.onLoadComplete.call(n, t)
                    }).fail(function(t) {
                        e.isFunction(s.onLoadError) && s.onLoadError.call(n, t)
                    })
                }
                return this
            };
            var p = function(e) {
                return a && a.hasOwnProperty(e) ? (r = a[e], l.doSearch(s)) : !1
            };
            return this.nextPage = function() {
                return p("nextPageToken")
            }, this.prevPage = function() {
                return p("prevPageToken")
            }, this
        },
        a = function(t, n) {
            var i = this,
                o = n.prefix,
                a = n.language;
            return this.template = function(e, i) {
                var r = "",
                    s = "";
                switch (e) {
                    case "panel":
                        n.preview && (s = '<div class="' + o + '-preview"><div class="' + o + '-actions"><a herf="javascript:;" class="' + o + '-preview-select-btn">' + a.buttons.select + '</a><a herf="javascript:;" class="' + o + '-preview-close-btn">' + a.buttons.close + '</a></div><div class="' + o + '-player"></div></div>'), r = '<div id="' + o + "-" + t + '" class="' + o + " " + o + '-panel"><div class="' + o + '-wrap"><div class="' + o + '-results nano"><div class="' + o + '-content nano-content"></div><div class="' + o + '-loader">' + a.labels.loading + '</div><div class="' + o + '-no-records">' + a.labels.noRecords + "</div></div>" + s + "</div></div>";
                        break;
                    case "item":
                        n.preview && (s = '<a class="' + o + '-preview-btn" href="javascript:;">' + a.buttons.preview + "</a>"), r = '<div class="' + o + '-item"><div class="' + o + '-thumbnail"><img src="' + i.thumb + '"/></div><div class="' + o + '-info"><p class="' + o + '-title">' + i.title + '</p><p class="' + o + '-description">' + i.description + '</p></div><div class="' + o + '-actions">' + s + '<a class="' + o + '-select-btn" href="javascript:;">' + a.buttons.select + "</a></div></div>";
                        break;
                    case "player":
                        r = '<embed width="100%" height="100%" src="http://youtube.com/v/' + i.vid + '&autoplay=1&showsearch=0&iv_load_policy=3&fs=0&rel=0&loop=0" type="application/x-shockwave-flash"></embed>'
                }
                return r
            }, this.populate = function(a) {
                var r = e("#" + n.prefix + "-" + t),
                    s = r.find("." + n.prefix + "-content"),
                    l = r.find("." + n.prefix + "-no-records");
                if (a.hasItems) {
                    l.hide();
                    var c, d;
                    for (c in a.items) a.items.hasOwnProperty(c) && (d = a.items[c], d = {
                        vid: d.id.videoId,
                        title: d.snippet.title,
                        description: d.snippet.description,
                        thumb: d.snippet.thumbnails.default.url
                    }, s.append(i.template("item", d)), e.data(r.find("." + o + "-item:last")[0], "YPItemData", d))
                } else l.show();
                this.preview(r).click(), r.find(".nano").nanoScroller()
            }, this.select = function(t, i, a) {
                t.find("." + o + "-select-btn").off().on("click", function() {
                    var r = e(this).closest("." + o + "-item").data("YPItemData");
                    n.cloneField && (a.val(r.vid), r = e.extend({}, r, {
                        clone: a,
                        term: i.val()
                    })), i.trigger("itemSelected", r), t.hide()
                })
            }, this.preview = function(t) {
                var n = this,
                    i = n.preview;
                return i.close = function() {
                    var e = t.find("." + o + "-preview");
                    e.hasClass("show") && e.removeClass("show"), t.find("." + o + "-player").empty(), t.find("." + o + "-preview-btn.current").removeClass("current")
                }, i.click = function() {
                    t.find("." + o + "-preview-btn").off().on("click", function() {
                        var i = e(this).closest("." + o + "-item").data("YPItemData"),
                            a = t.find("." + o + "-preview").addClass("show").find("." + o + "-player");
                        a.html(n.template("player", i)), t.find("." + o + "-preview-btn").removeClass("current"), e(this).addClass("current")
                    })
                }, t.find("." + o + "-preview-close-btn").click(function() {
                    i.close()
                }), t.find("." + o + "-preview-select-btn").click(function() {
                    t.find("." + o + "-preview-btn.current").parent().find("." + o + "-select-btn").click(), i.close()
                }), i
            }, this
        };
    e.fn.icon_picker = function(t, i) {
        var r = e.extend({}, n, i),
            s = new o(t, r);
        return t && t.hasOwnProperty("API_KEY") ? this.each(function() {
            var t = null,
                n = null,
                i = e(this),
                o = (new Date).getTime(),
                l = "",
                c = new a(o, r);
            r.cloneField && (n = i.clone(!0), i.removeAttr("name"), n.insertAfter(i), n.hide().removeAttr("class").removeAttr("id"));
            var d = c.template("panel");
            e(d).insertAfter(i), d = e("#" + r.prefix + "-" + o);
            var p = i.offset().left - d.parent().offset().left;
            r.offset.x && (p += parseInt(r.offset.x, 10)), d.css("margin-left", p), p = 0, r.offset.y && (p += parseInt(s.offset.y, 10)), d.css("margin-top", p), e.isFunction(d.find(".nano").nanoScroller) && d.find(".nano").nanoScroller(setTimeout.nanoScroller).on("scrollend", function() {
                s.nextPage()
            }), i.on("keyup", function() {
                var o = e(this).val(),
                    a = d.find("." + r.prefix + "-content");
                c.preview(d).close(), clearTimeout(t), o.length ? o.length >= r.minChar && l !== o && (t = setTimeout(function() {
                    l = o, a.empty(), s.doSearch({
                        query: o,
                        onLoadInit: function() {
                            d.addClass("loading"), i.trigger("loadInit", {
                                term: o
                            })
                        },
                        onLoadComplete: function(t) {
                            t = e.extend({}, t, {
                                hasItems: Boolean(t.items)
                            }), c.populate(t), i.trigger("loadComplete", t), c.select(d, i, n), d.removeClass("loading")
                        },
                        onLoadError: function(e) {
                            i.trigger("loadError", e)
                        }
                    })
                }, 1e3 * parseInt(r.searchDelay, 10))) : a.empty()
            }).on("focus", function() {
                e("." + r.prefix + ".panel").hide(), d.is(":visible") || d.show()
            }).on("blur", function() {
                d.is(":hover") || d.hide()
            })
        }) : void 0
    }
}(jQuery);