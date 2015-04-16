/**
 * Created by Wolfram on 16/04/15.
 */
!function (a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : b(a.jQuery)
}(this, function (a) {
    "function" != typeof Object.create && (Object.create = function (a) {
        function b() {
        }

        return b.prototype = a, new b
    });
    var b = {
        init: function (b) {
            return this.options = a.extend({}, a.noty.defaults, b), this.options.layout = this.options.custom ? a.noty.layouts.inline : a.noty.layouts[this.options.layout], a.noty.themes[this.options.theme] ? this.options.theme = a.noty.themes[this.options.theme] : b.themeClassName = this.options.theme, delete b.layout, delete b.theme, this.options = a.extend({}, this.options, this.options.layout.options), this.options.id = "noty_" + (new Date).getTime() * Math.floor(1e6 * Math.random()), this.options = a.extend({}, this.options, b), this._build(), this
        }, _build: function () {
            var b = a('<div class="noty_bar noty_type_' + this.options.type + '"></div>').attr("id", this.options.id);
            if (b.append(this.options.template).find(".noty_text").html(this.options.text), this.$bar = null !== this.options.layout.parent.object ? a(this.options.layout.parent.object).css(this.options.layout.parent.css).append(b) : b, this.options.themeClassName && this.$bar.addClass(this.options.themeClassName).addClass("noty_container_type_" + this.options.type), this.options.buttons) {
                this.options.closeWith = [], this.options.timeout = !1;
                var c = a("<div/>").addClass("noty_buttons");
                null !== this.options.layout.parent.object ? this.$bar.find(".noty_bar").append(c) : this.$bar.append(c);
                var d = this;
                a.each(this.options.buttons, function (b, c) {
                    var e = a("<button/>").addClass(c.addClass ? c.addClass : "gray").html(c.text).attr("id", c.id ? c.id : "button-" + b).appendTo(d.$bar.find(".noty_buttons")).on("click", function (b) {
                        a.isFunction(c.onClick) && c.onClick.call(e, d, b)
                    })
                })
            }
            this.$message = this.$bar.find(".noty_message"), this.$closeButton = this.$bar.find(".noty_close"), this.$buttons = this.$bar.find(".noty_buttons"), a.noty.store[this.options.id] = this
        }, show: function () {
            var b = this;
            return b.options.custom ? b.options.custom.find(b.options.layout.container.selector).append(b.$bar) : a(b.options.layout.container.selector).append(b.$bar), b.options.theme && b.options.theme.style && b.options.theme.style.apply(b), "function" === a.type(b.options.layout.css) ? this.options.layout.css.apply(b.$bar) : b.$bar.css(this.options.layout.css || {}), b.$bar.addClass(b.options.layout.addClass), b.options.layout.container.style.apply(a(b.options.layout.container.selector)), b.showing = !0, b.options.theme && b.options.theme.style && b.options.theme.callback.onShow.apply(this), a.inArray("click", b.options.closeWith) > -1 && b.$bar.css("cursor", "pointer").one("click", function (a) {
                b.stopPropagation(a), b.options.callback.onCloseClick && b.options.callback.onCloseClick.apply(b), b.close()
            }), a.inArray("hover", b.options.closeWith) > -1 && b.$bar.one("mouseenter", function () {
                b.close()
            }), a.inArray("button", b.options.closeWith) > -1 && b.$closeButton.one("click", function (a) {
                b.stopPropagation(a), b.close()
            }), -1 == a.inArray("button", b.options.closeWith) && b.$closeButton.remove(), b.options.callback.onShow && b.options.callback.onShow.apply(b), "string" == typeof b.options.animation.open ? (b.$bar.css("height", b.$bar.innerHeight()), b.$bar.show().addClass(b.options.animation.open).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                b.options.callback.afterShow && b.options.callback.afterShow.apply(b), b.showing = !1, b.shown = !0
            })) : b.$bar.animate(b.options.animation.open, b.options.animation.speed, b.options.animation.easing, function () {
                b.options.callback.afterShow && b.options.callback.afterShow.apply(b), b.showing = !1, b.shown = !0
            }), b.options.timeout && b.$bar.delay(b.options.timeout).promise().done(function () {
                b.close()
            }), this
        }, close: function () {
            if (!(this.closed || this.$bar && this.$bar.hasClass("i-am-closing-now"))) {
                var b = this;
                if (this.showing)return b.$bar.queue(function () {
                    b.close.apply(b)
                }), void 0;
                if (!this.shown && !this.showing) {
                    var c = [];
                    return a.each(a.noty.queue, function (a, d) {
                        d.options.id != b.options.id && c.push(d)
                    }), a.noty.queue = c, void 0
                }
                b.$bar.addClass("i-am-closing-now"), b.options.callback.onClose && b.options.callback.onClose.apply(b), "string" == typeof b.options.animation.close ? b.$bar.addClass(b.options.animation.close).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                    b.options.callback.afterClose && b.options.callback.afterClose.apply(b), b.closeCleanUp()
                }) : b.$bar.clearQueue().stop().animate(b.options.animation.close, b.options.animation.speed, b.options.animation.easing, function () {
                    b.options.callback.afterClose && b.options.callback.afterClose.apply(b)
                }).promise().done(function () {
                    b.closeCleanUp()
                })
            }
        }, closeCleanUp: function () {
            var b = this;
            b.options.modal && (a.notyRenderer.setModalCount(-1), 0 == a.notyRenderer.getModalCount() && a(".noty_modal").fadeOut("fast", function () {
                a(this).remove()
            })), a.notyRenderer.setLayoutCountFor(b, -1), 0 == a.notyRenderer.getLayoutCountFor(b) && a(b.options.layout.container.selector).remove(), "undefined" != typeof b.$bar && null !== b.$bar && ("string" == typeof b.options.animation.close ? (b.$bar.css("transition", "all 100ms ease").css("border", 0).css("margin", 0).height(0), b.$bar.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                b.$bar.remove(), b.$bar = null, b.closed = !0, b.options.theme.callback && b.options.theme.callback.onClose && b.options.theme.callback.onClose.apply(b)
            })) : (b.$bar.remove(), b.$bar = null, b.closed = !0)), delete a.noty.store[b.options.id], b.options.theme.callback && b.options.theme.callback.onClose && b.options.theme.callback.onClose.apply(b), b.options.dismissQueue || (a.noty.ontap = !0, a.notyRenderer.render()), b.options.maxVisible > 0 && b.options.dismissQueue && a.notyRenderer.render()
        }, setText: function (a) {
            return this.closed || (this.options.text = a, this.$bar.find(".noty_text").html(a)), this
        }, setType: function (a) {
            return this.closed || (this.options.type = a, this.options.theme.style.apply(this), this.options.theme.callback.onShow.apply(this)), this
        }, setTimeout: function (a) {
            if (!this.closed) {
                var b = this;
                this.options.timeout = a, b.$bar.delay(b.options.timeout).promise().done(function () {
                    b.close()
                })
            }
            return this
        }, stopPropagation: function (a) {
            a = a || window.event, "undefined" != typeof a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        }, closed: !1, showing: !1, shown: !1
    };
    a.notyRenderer = {}, a.notyRenderer.init = function (c) {
        var d = Object.create(b).init(c);
        return d.options.killer && a.noty.closeAll(), d.options.force ? a.noty.queue.unshift(d) : a.noty.queue.push(d), a.notyRenderer.render(), "object" == a.noty.returns ? d : d.options.id
    }, a.notyRenderer.render = function () {
        var b = a.noty.queue[0];
        "object" === a.type(b) ? b.options.dismissQueue ? b.options.maxVisible > 0 ? a(b.options.layout.container.selector + " li").length < b.options.maxVisible && a.notyRenderer.show(a.noty.queue.shift()) : a.notyRenderer.show(a.noty.queue.shift()) : a.noty.ontap && (a.notyRenderer.show(a.noty.queue.shift()), a.noty.ontap = !1) : a.noty.ontap = !0
    }, a.notyRenderer.show = function (b) {
        b.options.modal && (a.notyRenderer.createModalFor(b), a.notyRenderer.setModalCount(1)), b.options.custom ? 0 == b.options.custom.find(b.options.layout.container.selector).length ? b.options.custom.append(a(b.options.layout.container.object).addClass("i-am-new")) : b.options.custom.find(b.options.layout.container.selector).removeClass("i-am-new") : 0 == a(b.options.layout.container.selector).length ? a("body").append(a(b.options.layout.container.object).addClass("i-am-new")) : a(b.options.layout.container.selector).removeClass("i-am-new"), a.notyRenderer.setLayoutCountFor(b, 1), b.show()
    }, a.notyRenderer.createModalFor = function (b) {
        if (0 == a(".noty_modal").length) {
            var c = a("<div/>").addClass("noty_modal").addClass(b.options.theme).data("noty_modal_count", 0);
            b.options.theme.modal && b.options.theme.modal.css && c.css(b.options.theme.modal.css), c.prependTo(a("body")).fadeIn("fast"), a.inArray("backdrop", b.options.closeWith) > -1 && c.on("click", function () {
                a.noty.closeAll()
            })
        }
    }, a.notyRenderer.getLayoutCountFor = function (b) {
        return a(b.options.layout.container.selector).data("noty_layout_count") || 0
    }, a.notyRenderer.setLayoutCountFor = function (b, c) {
        return a(b.options.layout.container.selector).data("noty_layout_count", a.notyRenderer.getLayoutCountFor(b) + c)
    }, a.notyRenderer.getModalCount = function () {
        return a(".noty_modal").data("noty_modal_count") || 0
    }, a.notyRenderer.setModalCount = function (b) {
        return a(".noty_modal").data("noty_modal_count", a.notyRenderer.getModalCount() + b)
    }, a.fn.noty = function (b) {
        return b.custom = a(this), a.notyRenderer.init(b)
    }, a.noty = {}, a.noty.queue = [], a.noty.ontap = !0, a.noty.layouts = {}, a.noty.themes = {}, a.noty.returns = "object", a.noty.store = {}, a.noty.get = function (b) {
        return a.noty.store.hasOwnProperty(b) ? a.noty.store[b] : !1
    }, a.noty.close = function (b) {
        return a.noty.get(b) ? a.noty.get(b).close() : !1
    }, a.noty.setText = function (b, c) {
        return a.noty.get(b) ? a.noty.get(b).setText(c) : !1
    }, a.noty.setType = function (b, c) {
        return a.noty.get(b) ? a.noty.get(b).setType(c) : !1
    }, a.noty.clearQueue = function () {
        a.noty.queue = []
    }, a.noty.closeAll = function () {
        a.noty.clearQueue(), a.each(a.noty.store, function (a, b) {
            b.close()
        })
    };
    var c = window.alert;
    a.noty.consumeAlert = function (b) {
        window.alert = function (c) {
            b ? b.text = c : b = {text: c}, a.notyRenderer.init(b)
        }
    }, a.noty.stopConsumeAlert = function () {
        window.alert = c
    }, a.noty.defaults = {
        layout: "top",
        theme: "defaultTheme",
        type: "alert",
        text: "",
        dismissQueue: !0,
        template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
        animation: {
            open: {height: "toggle"},
            close: {height: "toggle"},
            easing: "swing",
            speed: 500
        },
        timeout: !1,
        force: !1,
        modal: !1,
        maxVisible: 5,
        killer: !1,
        closeWith: ["click"],
        callback: {
            onShow: function () {
            }, afterShow: function () {
            }, onClose: function () {
            }, afterClose: function () {
            }, onCloseClick: function () {
            }
        },
        buttons: !1
    }, a(window).on("resize", function () {
        a.each(a.noty.layouts, function (b, c) {
            c.container.style.apply(a(c.container.selector))
        })
    }), window.noty = function (a) {
        return jQuery.notyRenderer.init(a)
    }, a.noty.layouts.bottom = {
        name: "bottom",
        options: {},
        container: {
            object: '<ul id="noty_bottom_layout_container" />',
            selector: "ul#noty_bottom_layout_container",
            style: function () {
                a(this).css({
                    bottom: 0,
                    left: "5%",
                    position: "fixed",
                    width: "90%",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 9999999
                })
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }, a.noty.layouts.bottomCenter = {
        name: "bottomCenter",
        options: {},
        container: {
            object: '<ul id="noty_bottomCenter_layout_container" />',
            selector: "ul#noty_bottomCenter_layout_container",
            style: function () {
                a(this).css({
                    bottom: 20,
                    left: 0,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), a(this).css({left: (a(window).width() - a(this).outerWidth(!1)) / 2 + "px"})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }, a.noty.layouts.bottomLeft = {
        name: "bottomLeft",
        options: {},
        container: {
            object: '<ul id="noty_bottomLeft_layout_container" />',
            selector: "ul#noty_bottomLeft_layout_container",
            style: function () {
                a(this).css({
                    bottom: 20,
                    left: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), window.innerWidth < 600 && a(this).css({left: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }, a.noty.layouts.bottomRight = {
        name: "bottomRight",
        options: {},
        container: {
            object: '<ul id="noty_bottomRight_layout_container" />',
            selector: "ul#noty_bottomRight_layout_container",
            style: function () {
                a(this).css({
                    bottom: 20,
                    right: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), window.innerWidth < 600 && a(this).css({right: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }, a.noty.layouts.center = {
        name: "center",
        options: {},
        container: {
            object: '<ul id="noty_center_layout_container" />',
            selector: "ul#noty_center_layout_container",
            style: function () {
                a(this).css({
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                });
                var b = a(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                a("body").append(b), b.find(".i-am-closing-now").remove(), b.find("li").css("display", "block");
                var c = b.height();
                b.remove(), a(this).hasClass("i-am-new") ? a(this).css({
                    left: (a(window).width() - a(this).outerWidth(!1)) / 2 + "px",
                    top: (a(window).height() - c) / 2 + "px"
                }) : a(this).animate({
                    left: (a(window).width() - a(this).outerWidth(!1)) / 2 + "px",
                    top: (a(window).height() - c) / 2 + "px"
                }, 500)
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }, a.noty.layouts.centerLeft = {
        name: "centerLeft",
        options: {},
        container: {
            object: '<ul id="noty_centerLeft_layout_container" />',
            selector: "ul#noty_centerLeft_layout_container",
            style: function () {
                a(this).css({
                    left: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                });
                var b = a(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                a("body").append(b), b.find(".i-am-closing-now").remove(), b.find("li").css("display", "block");
                var c = b.height();
                b.remove(), a(this).hasClass("i-am-new") ? a(this).css({top: (a(window).height() - c) / 2 + "px"}) : a(this).animate({top: (a(window).height() - c) / 2 + "px"}, 500), window.innerWidth < 600 && a(this).css({left: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }, a.noty.layouts.centerRight = {
        name: "centerRight",
        options: {},
        container: {
            object: '<ul id="noty_centerRight_layout_container" />',
            selector: "ul#noty_centerRight_layout_container",
            style: function () {
                a(this).css({
                    right: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                });
                var b = a(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                a("body").append(b), b.find(".i-am-closing-now").remove(), b.find("li").css("display", "block");
                var c = b.height();
                b.remove(), a(this).hasClass("i-am-new") ? a(this).css({top: (a(window).height() - c) / 2 + "px"}) : a(this).animate({top: (a(window).height() - c) / 2 + "px"}, 500), window.innerWidth < 600 && a(this).css({right: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }, a.noty.layouts.inline = {
        name: "inline",
        options: {},
        container: {
            object: '<ul class="noty_inline_layout_container" />',
            selector: "ul.noty_inline_layout_container",
            style: function () {
                a(this).css({
                    width: "100%",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 9999999
                })
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }, a.noty.layouts.top = {
        name: "top",
        options: {},
        container: {
            object: '<ul id="noty_top_layout_container" />',
            selector: "ul#noty_top_layout_container",
            style: function () {
                a(this).css({
                    top: 0,
                    left: "5%",
                    position: "fixed",
                    width: "90%",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 9999999
                })
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none"},
        addClass: ""
    }, a.noty.layouts.topCenter = {
        name: "topCenter",
        options: {},
        container: {
            object: '<ul id="noty_topCenter_layout_container" />',
            selector: "ul#noty_topCenter_layout_container",
            style: function () {
                a(this).css({
                    top: 20,
                    left: 0,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), a(this).css({left: (a(window).width() - a(this).outerWidth(!1)) / 2 + "px"})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }, a.noty.layouts.topLeft = {
        name: "topLeft",
        options: {},
        container: {
            object: '<ul id="noty_topLeft_layout_container" />',
            selector: "ul#noty_topLeft_layout_container",
            style: function () {
                a(this).css({
                    top: 20,
                    left: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), window.innerWidth < 600 && a(this).css({left: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }, a.noty.layouts.topRight = {
        name: "topRight",
        options: {},
        container: {
            object: '<ul id="noty_topRight_layout_container" />',
            selector: "ul#noty_topRight_layout_container",
            style: function () {
                a(this).css({
                    top: 20,
                    right: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }), window.innerWidth < 600 && a(this).css({right: 5})
            }
        },
        parent: {object: "<li />", selector: "li", css: {}},
        css: {display: "none", width: "310px"},
        addClass: ""
    }, a.noty.themes.bootstrapTheme = {
        name: "bootstrapTheme",
        modal: {
            css: {
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#000",
                zIndex: 1e4,
                opacity: .6,
                display: "none",
                left: 0,
                top: 0
            }
        },
        style: function () {
            var b = this.options.layout.container.selector;
            switch (a(b).addClass("list-group"), this.$closeButton.append('<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>'), this.$closeButton.addClass("close"), this.$bar.addClass("list-group-item").css("padding", "0px"), this.options.type) {
                case"alert":
                case"notification":
                    this.$bar.addClass("list-group-item-info");
                    break;
                case"warning":
                    this.$bar.addClass("list-group-item-warning");
                    break;
                case"error":
                    this.$bar.addClass("list-group-item-danger");
                    break;
                case"information":
                    this.$bar.addClass("list-group-item-info");
                    break;
                case"success":
                    this.$bar.addClass("list-group-item-success")
            }
            this.$message.css({
                fontSize: "13px",
                lineHeight: "16px",
                textAlign: "center",
                padding: "8px 10px 9px",
                width: "auto",
                position: "relative"
            })
        },
        callback: {
            onShow: function () {
            }, onClose: function () {
            }
        }
    }, a.noty.themes.defaultTheme = {
        name: "defaultTheme",
        helpers: {
            borderFix: function () {
                if (this.options.dismissQueue) {
                    var b = this.options.layout.container.selector + " " + this.options.layout.parent.selector;
                    switch (this.options.layout.name) {
                        case"top":
                            a(b).css({borderRadius: "0px 0px 0px 0px"}), a(b).last().css({borderRadius: "0px 0px 5px 5px"});
                            break;
                        case"topCenter":
                        case"topLeft":
                        case"topRight":
                        case"bottomCenter":
                        case"bottomLeft":
                        case"bottomRight":
                        case"center":
                        case"centerLeft":
                        case"centerRight":
                        case"inline":
                            a(b).css({borderRadius: "0px 0px 0px 0px"}), a(b).first().css({
                                "border-top-left-radius": "5px",
                                "border-top-right-radius": "5px"
                            }), a(b).last().css({
                                "border-bottom-left-radius": "5px",
                                "border-bottom-right-radius": "5px"
                            });
                            break;
                        case"bottom":
                            a(b).css({borderRadius: "0px 0px 0px 0px"}), a(b).first().css({borderRadius: "5px 5px 0px 0px"})
                    }
                }
            }
        },
        modal: {
            css: {
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#000",
                zIndex: 1e4,
                opacity: .6,
                display: "none",
                left: 0,
                top: 0
            }
        },
        style: function () {
            switch (this.$bar.css({
                overflow: "hidden",
                background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAQAAAClM0ndAAAAhklEQVR4AdXO0QrCMBBE0bttkk38/w8WRERpdyjzVOc+HxhIHqJGMQcFFkpYRQotLLSw0IJ5aBdovruMYDA/kT8plF9ZKLFQcgF18hDj1SbQOMlCA4kao0iiXmah7qBWPdxpohsgVZyj7e5I9KcID+EhiDI5gxBYKLBQYKHAQoGFAoEks/YEGHYKB7hFxf0AAAAASUVORK5CYII=') repeat-x scroll left top #fff"
            }), this.$message.css({
                fontSize: "13px",
                lineHeight: "16px",
                textAlign: "center",
                padding: "8px 10px 9px",
                width: "auto",
                position: "relative"
            }), this.$closeButton.css({
                position: "absolute",
                top: 4,
                right: 4,
                width: 10,
                height: 10,
                background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",
                display: "none",
                cursor: "pointer"
            }), this.$buttons.css({
                padding: 5,
                textAlign: "right",
                borderTop: "1px solid #ccc",
                backgroundColor: "#fff"
            }), this.$buttons.find("button").css({marginLeft: 5}), this.$buttons.find("button:first").css({marginLeft: 0}), this.$bar.on({
                mouseenter: function () {
                    a(this).find(".noty_close").stop().fadeTo("normal", 1)
                }, mouseleave: function () {
                    a(this).find(".noty_close").stop().fadeTo("normal", 0)
                }
            }), this.options.layout.name) {
                case"top":
                    this.$bar.css({
                        borderRadius: "0px 0px 5px 5px",
                        borderBottom: "2px solid #eee",
                        borderLeft: "2px solid #eee",
                        borderRight: "2px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    break;
                case"topCenter":
                case"center":
                case"bottomCenter":
                case"inline":
                    this.$bar.css({
                        borderRadius: "5px",
                        border: "1px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }), this.$message.css({
                        fontSize: "13px",
                        textAlign: "center"
                    });
                    break;
                case"topLeft":
                case"topRight":
                case"bottomLeft":
                case"bottomRight":
                case"centerLeft":
                case"centerRight":
                    this.$bar.css({
                        borderRadius: "5px",
                        border: "1px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }), this.$message.css({
                        fontSize: "13px",
                        textAlign: "left"
                    });
                    break;
                case"bottom":
                    this.$bar.css({
                        borderRadius: "5px 5px 0px 0px",
                        borderTop: "2px solid #eee",
                        borderLeft: "2px solid #eee",
                        borderRight: "2px solid #eee",
                        boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    break;
                default:
                    this.$bar.css({
                        border: "2px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    })
            }
            switch (this.options.type) {
                case"alert":
                case"notification":
                    this.$bar.css({
                        backgroundColor: "#FFF",
                        borderColor: "#CCC",
                        color: "#444"
                    });
                    break;
                case"warning":
                    this.$bar.css({
                        backgroundColor: "#FFEAA8",
                        borderColor: "#FFC237",
                        color: "#826200"
                    }), this.$buttons.css({borderTop: "1px solid #FFC237"});
                    break;
                case"error":
                    this.$bar.css({
                        backgroundColor: "red",
                        borderColor: "darkred",
                        color: "#FFF"
                    }), this.$message.css({fontWeight: "bold"}), this.$buttons.css({borderTop: "1px solid darkred"});
                    break;
                case"information":
                    this.$bar.css({
                        backgroundColor: "#57B7E2",
                        borderColor: "#0B90C4",
                        color: "#FFF"
                    }), this.$buttons.css({borderTop: "1px solid #0B90C4"});
                    break;
                case"success":
                    this.$bar.css({
                        backgroundColor: "lightgreen",
                        borderColor: "#50C24E",
                        color: "darkgreen"
                    }), this.$buttons.css({borderTop: "1px solid #50C24E"});
                    break;
                default:
                    this.$bar.css({
                        backgroundColor: "#FFF",
                        borderColor: "#CCC",
                        color: "#444"
                    })
            }
        },
        callback: {
            onShow: function () {
                a.noty.themes.defaultTheme.helpers.borderFix.apply(this)
            }, onClose: function () {
                a.noty.themes.defaultTheme.helpers.borderFix.apply(this)
            }
        }
    }, a.noty.themes.relax = {
        name: "relax",
        helpers: {},
        modal: {
            css: {
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#000",
                zIndex: 1e4,
                opacity: .6,
                display: "none",
                left: 0,
                top: 0
            }
        },
        style: function () {
            switch (this.$bar.css({
                overflow: "hidden",
                margin: "4px 0",
                borderRadius: "2px"
            }), this.$message.css({
                fontSize: "14px",
                lineHeight: "16px",
                textAlign: "center",
                padding: "10px",
                width: "auto",
                position: "relative"
            }), this.$closeButton.css({
                position: "absolute",
                top: 4,
                right: 4,
                width: 10,
                height: 10,
                background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",
                display: "none",
                cursor: "pointer"
            }), this.$buttons.css({
                padding: 5,
                textAlign: "right",
                borderTop: "1px solid #ccc",
                backgroundColor: "#fff"
            }), this.$buttons.find("button").css({marginLeft: 5}), this.$buttons.find("button:first").css({marginLeft: 0}), this.$bar.on({
                mouseenter: function () {
                    a(this).find(".noty_close").stop().fadeTo("normal", 1)
                }, mouseleave: function () {
                    a(this).find(".noty_close").stop().fadeTo("normal", 0)
                }
            }), this.options.layout.name) {
                case"top":
                    this.$bar.css({
                        borderBottom: "2px solid #eee",
                        borderLeft: "2px solid #eee",
                        borderRight: "2px solid #eee",
                        borderTop: "2px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    break;
                case"topCenter":
                case"center":
                case"bottomCenter":
                case"inline":
                    this.$bar.css({
                        border: "1px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }), this.$message.css({
                        fontSize: "13px",
                        textAlign: "center"
                    });
                    break;
                case"topLeft":
                case"topRight":
                case"bottomLeft":
                case"bottomRight":
                case"centerLeft":
                case"centerRight":
                    this.$bar.css({
                        border: "1px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }), this.$message.css({
                        fontSize: "13px",
                        textAlign: "left"
                    });
                    break;
                case"bottom":
                    this.$bar.css({
                        borderTop: "2px solid #eee",
                        borderLeft: "2px solid #eee",
                        borderRight: "2px solid #eee",
                        borderBottom: "2px solid #eee",
                        boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)"
                    });
                    break;
                default:
                    this.$bar.css({
                        border: "2px solid #eee",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    })
            }
            switch (this.options.type) {
                case"alert":
                case"notification":
                    this.$bar.css({
                        backgroundColor: "#FFF",
                        borderColor: "#dedede",
                        color: "#444"
                    });
                    break;
                case"warning":
                    this.$bar.css({
                        backgroundColor: "#FFEAA8",
                        borderColor: "#FFC237",
                        color: "#826200"
                    }), this.$buttons.css({borderTop: "1px solid #FFC237"});
                    break;
                case"error":
                    this.$bar.css({
                        backgroundColor: "#FF8181",
                        borderColor: "#e25353",
                        color: "#FFF"
                    }), this.$message.css({fontWeight: "bold"}), this.$buttons.css({borderTop: "1px solid darkred"});
                    break;
                case"information":
                    this.$bar.css({
                        backgroundColor: "#78C5E7",
                        borderColor: "#3badd6",
                        color: "#FFF"
                    }), this.$buttons.css({borderTop: "1px solid #0B90C4"});
                    break;
                case"success":
                    this.$bar.css({
                        backgroundColor: "#BCF5BC",
                        borderColor: "#7cdd77",
                        color: "darkgreen"
                    }), this.$buttons.css({borderTop: "1px solid #50C24E"});
                    break;
                default:
                    this.$bar.css({
                        backgroundColor: "#FFF",
                        borderColor: "#CCC",
                        color: "#444"
                    })
            }
        },
        callback: {
            onShow: function () {
            }, onClose: function () {
            }
        }
    }
});