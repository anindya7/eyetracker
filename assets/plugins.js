/****  Variables Initiation  ****/
var doc = document;
var docEl = document.documentElement;
var $sidebar = $('.sidebar');
var $mainContent = $('.main-content');
var $sidebarWidth = $(".sidebar").width();
var is_RTL = false; 
if($('body').hasClass('rtl'))  is_RTL = true;

/* ==========================================================*/
/* PLUGINS                                                   */
/* ========================================================= */

(function($) {
    $.fn.autogrow = function() {
        return this.each(function() {
            var textarea = this;
            $.fn.autogrow.resize(textarea);
            $(textarea).focus(function() {
                textarea.interval = setInterval(function() {
                    $.fn.autogrow.resize(textarea);
                }, 500);
            }).blur(function() {
                clearInterval(textarea.interval);
            });
        });
    };
    $.fn.autogrow.resize = function(textarea) {
        var lineHeight = parseInt($(textarea).css('line-height'), 10);
        var lines = textarea.value.split('\n');
        var columns = textarea.cols;
        var lineCount = 0;
        $.each(lines, function() {
            lineCount += Math.ceil(this.length / columns) || 1;
        });
        var height = lineHeight * (lineCount + 1);
        $(textarea).css('height', height);
    };
})(jQuery);

/**** Color Picker ****/
function colorPicker(){
    if ($('.color-picker').length && $.fn.spectrum) {
        $('.color-picker').each(function () {
            var current_palette = '';
            if($(this).data('palette')){
                current_palette = $(this).data('palette');
            }
            $(this).spectrum({
                color: $(this).data('min') ? $(this).data('min') : "#D15ADE",
                showInput: $(this).data('show-input') ? $(this).data('show-input') : false,
                showPalette: $(this).data('show-palette') ? $(this).data('show-palette') : false,
                showPaletteOnly: $(this).data('show-palette-only') ? $(this).data('show-palette-only') : false,
                showAlpha: $(this).data('show-alpha') ? $(this).data('show-alpha') : false,
                palette: $(this).data('palette') ? $(this).data('palette') : [[current_palette]]
            });
            $(this).show();
        });
    }
}

// PROGRESS BAR & CIRCLE
function handleProgress(){
    // PROGRESS BAR ANIMATION
    $('progress').on('appear', function(event, $allAppearedElements) {
        var progressBar = $(this),
            animationDelay = progressBar.data('animation-delay');
        if (animationDelay) {
            setTimeout(function() {
                progressBar.css('width', progressBar.attr('value') + '%');
                progressBar.parent().find('.progress-value').css('opacity', 1);
            }, animationDelay);
        } else {
            progressBar.css('width', progressBar.attr('value') + '%');
            progressBar.parent().find('.progress-value').css('opacity', 1);
        }
    });
    $('.progress.visible').each(function(){
        var progressBar = $(this).find('progress');
        progressBar.css('width', progressBar.attr('value') + '%');
        progressBar.parent().find('.progress-value').css('opacity', 1);
    });
}

/**** Numeric Stepper ****/
function numericStepper(){
    if ($('.numeric-stepper').length && $.fn.TouchSpin) {
        $('.numeric-stepper').each(function () {
            $(this).TouchSpin({
                min: $(this).data('min') ? $(this).data('min') : 0,
                max: $(this).data('max') ? $(this).data('max') : 100,
                step: $(this).data('step') ? $(this).data('step') : 0.1,
                decimals: $(this).data('decimals') ? $(this).data('decimals') : 0,
                boostat: $(this).data('boostat') ? $(this).data('boostat') : 5,
                maxboostedstep: $(this).data('maxboostedstep') ? $(this).data('maxboostedstep') : 10,
                verticalbuttons: $(this).data('vertical') ? $(this).data('vertical') : false,
                buttondown_class: $(this).data('btn-before') ? 'btn btn-' + $(this).data('btn-before') : 'btn btn-default',
                buttonup_class: $(this).data('btn-after') ? 'btn btn-' + $(this).data('btn-after') : 'btn btn-default',
            });
        });
    }
}

/**** Sortable Portlets ****/
function sortablePortlets(){
    if ($('.portlets').length && $.fn.sortable) {
        $( ".portlets" ).sortable({
            connectWith: ".portlets",
            handle: ".panel-header",
            items:'div.panel',
            placeholder: "panel-placeholder",
            opacity: 0.5,
            dropOnEmpty: true,
            forcePlaceholderSize: true,
            receive: function(event, ui) {
                $("body").trigger("resize");
            }
        });
    }
}

var oldIndex;
if ($('.sortable').length && $.fn.sortable) {
    $(".sortable").sortable({
        handle: ".panel-header, .card-title",
        start: function(event, ui) {
            oldIndex = ui.item.index();
            ui.placeholder.height(ui.item.height() - 20);
        },
        stop: function(event, ui) {
            var newIndex = ui.item.index();

            var movingForward = newIndex > oldIndex;            
            var nextIndex = newIndex + (movingForward ? -1 : 1);

            var items = $('.sortable > div');
            
            // Find the element to move
            var itemToMove = items.get(nextIndex);
            if (itemToMove) {
                
                // Find the element at the index where we want to move the itemToMove
                var newLocation = $(items.get(oldIndex));
                
                // Decide if it goes before or after
                if (movingForward) {
                    $(itemToMove).insertBefore(newLocation);
                } else {
                    $(itemToMove).insertAfter(newLocation);
                }
            }
        }
    });
}

/**** Nestable List ****/
function nestable(){
    if ($('.nestable').length && $.fn.nestable) {
        $(".nestable").nestable();
    }
}

 /**** Sortable Table ****/
function sortableTable(){
    if ($('.sortable_table').length && $.fn.sortable) {
        $(".sortable_table").sortable({
            itemPath: '> tbody',
            itemSelector: 'tbody tr',
            placeholder: '<tr class="placeholder"/>'
        });
    }
}

/****  Show Tooltip  ****/
function showTooltip(){
    if ($('[data-rel="tooltip"]').length && $.fn.tooltip) {
        $('[data-rel="tooltip"]').tooltip();
    }
}

 /****  Show Popover  ****/
function popover() {
    if ($('[rel="popover"]').length && $.fn.popover) {
        $('[rel="popover"]').popover({
            trigger: "hover"
        });
        $('[rel="popover_dark"]').popover({
            template: '<div class="popover popover-dark"><div class="arrow"></div><h3 class="popover-title popover-title"></h3><div class="popover-content popover-content"></div></div>',
            trigger: "hover"
        });
    }
}

/****  Table progress bar  ****/
function progressBar(){
    if ($('.progress-bar').length && $.fn.progressbar) {
        $('.progress-bar').progressbar();
    }
}

/* Manage Slider */
function sliderIOS(){
    if ($('.slide-ios').length && $.fn.slider) {
        $('.slide-ios').each(function () {
            $(this).sliderIOS();
        });
    }
}

/* Manage Range Slider */
function rangeSlider(){
    if ($('.range-slider').length && $.fn.ionRangeSlider) {
        $('.range-slider').each(function () {
            $(this).ionRangeSlider({
                min: $(this).data('min') ? $(this).data('min') : 0,
                max: $(this).data('max') ? $(this).data('max') : 5000,
                hideMinMax: $(this).data('hideMinMax') ? $(this).data('hideMinMax') : false,
                hideFromTo: $(this).data('hideFromTo') ? $(this).data('hideFromTo') : false,
                to: $(this).data('to') ? $(this).data('to') : '',
                step: $(this).data('step') ? $(this).data('step') : '',
                type: $(this).data('type') ? $(this).data('type') : 'double',
                prefix: $(this).data('prefix') ? $(this).data('prefix') : '',
                postfix: $(this).data('postfix') ? $(this).data('postfix') : '',
                maxPostfix: $(this).data('maxPostfix') ? $(this).data('maxPostfix') : '',
                hasGrid: $(this).data('hasGrid') ? $(this).data('hasGrid') : false,
                drag_interval: true
            });
        });
    }
}

/* Button Loading State */
function buttonLoader(){
    if($('.ladda-button').length){
        Ladda.bind('.ladda-button', {
            // timeout: 2000
        });
    }  
}

function inputSelect(){

    if ($.fn.select2) {
        setTimeout(function(){
            $('select:not(.select-picker)').each(function() {
                $(this).select2({
                    placeholder: $(this).data('placeholder') ? $(this).data('placeholder') : '',
                    allowClear: $(this).data('allowclear') ? $(this).data('allowclear') : false,
                    minimumInputLength: $(this).data('minimumInputLength') ? $(this).data('minimumInputLength') : -1,
                    minimumResultsForSearch: $(this).data('search') ? -1 : 1,
                    dropdownCssClass: $(this).data('style') ? $(this).data('style') : '',
                    containerCssClass: $(this).data('container-class') ? $(this).data('container-class') : ''
                });
            });
        },200);
    }
}

function inputTags(){
    $('.select-tags').each(function(){
        $(this).tagsinput({
            tagClass: 'label label-primary'

        });
    });

}

/****  Tables Responsive  ****/
function tableResponsive(){
    setTimeout(function () {
       $('.table').each(function () {
            window_width = $(window).width();
            table_width = $(this).width();
            content_width = $(this).parent().width();
            if(table_width > content_width) {
                $(this).parent().addClass('force-table-responsive');
            }
            else{
                $(this).parent().removeClass('force-table-responsive');
            }
        });
    }, 200);
}

// Handles custom checkboxes & radios using jQuery iCheck plugin
function handleiCheck() {

    if (!$().iCheck)  return;
    $(':checkbox:not(.js-switch, .switch-input, .switch-iphone, .onoffswitch-checkbox, .ios-checkbox, .md-checkbox), :radio:not(.md-radio)').each(function() {

        var checkboxClass = $(this).attr('data-checkbox') ? $(this).attr('data-checkbox') : 'icheckbox_minimal-grey';
        var radioClass = $(this).attr('data-radio') ? $(this).attr('data-radio') : 'iradio_minimal-grey';

        if (checkboxClass.indexOf('_line') > -1 || radioClass.indexOf('_line') > -1) {
            $(this).iCheck({
                checkboxClass: checkboxClass,
                radioClass: radioClass,
                insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
            });
        } else {
            $(this).iCheck({
                checkboxClass: checkboxClass,
                radioClass: radioClass
            });
        }
    });
}

/* Time picker */     
function timepicker(){
    $('.timepicker').each(function () {
        $(this).timepicker({
            isRTL : $('body').hasClass('rtl') ? true : false,
            timeFormat: $(this).attr('data-format', 'am-pm') ? 'hh:mm tt'  : 'HH:mm'
        });
    });
}
         
 /* Date picker */     
function datepicker(){
    $('.date-picker').each(function () {
         $(this).datepicker({
            numberOfMonths: 1,
            isRTL : $('body').hasClass('rtl') ? true : false,
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>',         
            showButtonPanel: false
        });
    });
}

 /* Date picker */     
function bDatepicker(){
    $('.b-datepicker').each(function () {
        $(this).bootstrapDatepicker({
            startView: $(this).data('view') ? $(this).data('view') : 0, // 0: month view , 1: year view, 2: multiple year view
            language: $(this).data('lang') ? $(this).data('lang') : "en",
            forceParse: $(this).data('parse') ? $(this).data('parse') : false,
            daysOfWeekDisabled: $(this).data('day-disabled') ? $(this).data('day-disabled') : "", // Disable 1 or various day. For monday and thursday: 1,3
            calendarWeeks: $(this).data('calendar-week') ? $(this).data('calendar-week') : false, // Display week number 
            autoclose: $(this).data('autoclose') ? $(this).data('autoclose') : false,
            todayHighlight: $(this).data('today-highlight') ? $(this).data('today-highlight') : true, // Highlight today date
            toggleActive: $(this).data('toggle-active') ? $(this).data('toggle-active') : true, // Close other when open
            multidate: $(this).data('multidate') ? $(this).data('multidate') : false, // Allow to select various days
            orientation: $(this).data('orientation') ? $(this).data('orientation') : "top", // Allow to select various days,
            rtl: $('html').hasClass('rtl') ? true : false
        });
    });
}

function multiDatesPicker(){
    $('.multidatepicker').each(function () {
        $(this).multiDatesPicker({
            dateFormat: 'yy-mm-dd',
            minDate: new Date(),
            maxDate: '+1y',
            firstDay: 1,
            showOtherMonths: true
        });
    });
}


/* Date & Time picker */     
function datetimepicker(){
    if ($.fn.datetimepicker) {
        $('.datetimepicker').each(function () {
           $(this).datetimepicker({
                prevText: '<i class="fa fa-angle-left"></i>',
                nextText: '<i class="fa fa-angle-right"></i>'                   
            });
        });

           /* Inline Date & Time picker */   
       $('.inline_datetimepicker').datetimepicker({
            altFieldTimeOnly: false,
            isRTL: is_RTL
        });
    }
}   

/* Popup Images */
function magnificPopup(){
    if ($('.magnific').length && $.fn.magnificPopup) {
        $('.magnific').magnificPopup({
            type:'image',
            gallery: {
                enabled: true
            },
            removalDelay: 300,
            mainClass: 'mfp-fade'
        });
    }
}  


function slider(){
    if ($('.slick').length && $.fn.slick) {
        $('.slick').each(function () {
            $(this).slick({
                accessibility: true, // Enables tabbing and arrow key navigation
                adaptiveHeight: false,
                arrows: $(this).data('arrows') ? $(this).data('arrows') : false, // Enable Next/Prev arrows
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>', // prev arrow
                nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>', // next arrow
                autoplay: false, // Enables auto play of slides
                autoplaySpeed: $(this).data('timing') ? $(this).data('timing') : 4000, // Auto play change interval
                centerMode: $(this).data('center') ? $(this).data('center') : false, // Enables centered view with partial prev/next slides.
                centerPadding: '50px', // Side padding when in center mode. (px or %)
                cssEase: 'ease', // CSS3 easing
                dots: $(this).attr('data-dots') ? $(this).attr('data-dots') : true, // Current slide indicator dots
                dotsClass: 'slick-dots', // Class for slide indicator dots container
                draggable: true, // Enables desktop dragging
                easing: 'linear', // animate() fallback easing
                fade: $(this).data('fade') ? $(this).data('fade') : false, // Enables fade
                focusOnSelect: false,
                infinite: $(this).data('infinite') ? $(this).data('infinite') : false, // Infinite looping
                lazyLoad: 'ondemand', // Accepts 'ondemand' or 'progressive' for lazy load technique
                onBeforeChange: null, // Before slide change callback
                onAfterChange: null, // After slide change callback
                onInit: null, // When Slick initializes for the first time callback
                onReInit: null, // Every time Slick (re-)initializes callback
                pauseOnHover: true, // Pauses autoplay on hover
                pauseOnDotsHover: false, // Pauses autoplay when a dot is hovered
                responsive: null, // Breakpoint triggered settings
                rtl: $('body').hasClass('rtl') ? true : false, // Change the slider's direction to become right-to-left
                slide: '.slide', // Slide element query
                slidesToShow: $(this).data('num-slides') ? $(this).data('num-slides') : 1, // # of slides to show at a time
                slidesToScroll:  $(this).data('num-scroll') ? $(this).data('num-scroll') : 1, // # of slides to show at a time,
                speed: 500, // Transition speed
                swipe: true, // Enables touch swipe
                swipeToSlide: false, // Swipe to slide irrespective of slidesToScroll
                touchMove: true, // Enables slide moving with touch
                touchThreshold: 5, // To advance slides, the user must swipe a length of (1/touchThreshold) * the width of the slider.
                useCSS: true, // Enable/Disable CSS Transitions
                variableWidth: $(this).data('variable-width')? true : false, // Disables automatic slide width calculation
                vertical: false, // Vertical slide direction
                waitForAnimate: true // Ignores requests to advance the slide while animating
            });
        });
    }
}

function formValidation(){
    if($('.form-validation').length && $.fn.validate){
        /* We add an addition rule to show you. Example : 4 + 8. You can other rules if you want */
        $.validator.methods.operation = function(value, element, param) {
            return value == param;
        };
        $.validator.methods.customemail = function(value, element) {
            return /^([-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4})+$/.test(value);
        };
        $.validator.methods.urlAddress = function(value, element) {
            return /^([-0-9a-zA-Z.+_]+\.[-0-9a-zA-Z.+&#_\/\=\?]*)$/.test(value);
        };
        $('input[name="url"]').on('change', function(){
            $(this).val(
                $(this).val().replace(/https?:\/\//gi,'')
            );
        });
        $('.form-validation').each(function(){
            var $form = $(this);
            var formValidation = $(this).validate({
                success: "valid",
                submitHandler: function(form) {
                    $form.find('button').eq(0).attr('disabled', 'disabled');
                    $('.loader-overlay').removeClass('loaded').addClass('opacity');
                    form.submit();
                },
                errorClass: "form-error",
                validClass: "form-success",
                errorElement: "div",
                ignore: [],
                rules: {       
                    avatar: {extension:"jpg|png|gif|jpeg|doc|docx|pdf|xls|rar|zip"},
                    password2: {equalTo: '#password'},
                    calcul: {operation: 12},
                    url: {urlAddress: true},
                    email: {
                        required:  {
                                depends:function(){
                                    $(this).val($.trim($(this).val()));
                                    return true;
                                }   
                            },
                        customemail: true
                    },
                },
                messages:{
                    url: 'Please enter a valid URL',
                    name: {required: 'Enter your name'},
                    lastname: {required: 'Enter your last name'},
                    firstname: {required: 'Enter your first name'},
                    email: {required: 'Enter email address', customemail: 'Enter a valid email address'},
                    language: {required: 'Enter your language'},
                    mobile: {required: 'Enter your phone number'},
                    avatar: {required: 'You must upload your avatar'},
                    password: {required: 'Write your password'},
                    password2: {required: 'Write your password',equalTo: '2 passwords must be the same'},
                    calcul: {required: 'Enter the result of 4 + 8',operation: 'Result is false. Try again!'},
                    terms: {required: 'You must agree with terms'}
                },
                highlight: function(element, errorClass, validClass) {
                    $(element).closest('.form-control').addClass(errorClass).removeClass(validClass);
                },
                unhighlight: function(element, errorClass, validClass) {
                    $(element).closest('.form-control').removeClass(errorClass).addClass(validClass);
                },
                errorPlacement: function(error, element) {
                   if (element.hasClass("custom-file") || element.hasClass("checkbox-type") || element.hasClass("language")) {
                        element.closest('.option-group').after(error);
                   }
                   else if (element.is(":radio") || element.is(":checkbox"))  {
                        element.closest('.option-group').after(error);
                   }
                   else if (element.parent().hasClass('input-group'))  {
                        element.parent().after(error);
                   }
                   else{
                       error.insertAfter(element);
                   }
                },
                invalidHandler: function(event, validator) {
                    var errors = validator.numberOfInvalids();         
                }      
            });
            $(".form-validation .cancel").click(function() {
                formValidation.resetForm();
            });
        });
    }
}

/****  Animated Panels  ****/
function liveTile() {
     
    if ($('.live-tile').length && $.fn.liveTile) {
        $('.live-tile').each(function () {
            $(this).liveTile("destroy", true); /* To get new size if resize event */
            tile_height = $(this).data("height") ? $(this).data("height") : $(this).find('.panel-body').height() + 52;
            $(this).height(tile_height);
            $(this).liveTile({
                speed: $(this).data("speed") ? $(this).data("speed") : 500, // Start after load or not
                mode: $(this).data("animation-easing") ? $(this).data("animation-easing") : 'carousel', // Animation type: carousel, slide, fade, flip, none
                playOnHover: $(this).data("play-hover") ? $(this).data("play-hover") : false, // Play live tile on hover
                repeatCount: $(this).data("repeat-count") ? $(this).data("repeat-count") : -1, // Repeat or not (-1 is infinite
                delay: $(this).data("delay") ? $(this).data("delay") : 0, // Time between two animations
                startNow: $(this).data("start-now") ? $(this).data("start-now") : true, //Start after load or not
            });
        });
    }
}

/**** Bar Charts: CHARTJS ****/
function barCharts() {
    if ($('.bar-stats').length) {
        $('.bar-stats').each(function () {
            var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
            var custom_colors =['#C9625F', '#18A689', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#8085e8', '#91e8e1'];
            var custom_color = custom_colors[Math.floor(Math.random()*custom_colors.length)];
            var barChartData = {
                labels : ["1","2","3","4","5","6","7","8","9","10","11","12"],
                datasets : [ {
                        backgroundColor : custom_color,
                        borderColor : custom_color,
                        pointBackgroundColor : "#394248",
                        pointBorderColor : "#394248",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    }
                ]
            }
            var ctx =  $(this).get(0).getContext("2d");
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive : true,
                scaleShowLabels: false,
                showScale: true,
                scaleLineColor: "rgba(0,0,0,.1)",
                scaleShowGridLines : false,
            });
        });
    }
}

function textareaAutosize(){
    $('textarea.autosize').each(function(){
        $(this).autosize();   
    });
} 

/****  Initiation of Main Functions  ****/
$(document).ready(function () {
    sortablePortlets();
    sortableTable();
    nestable();
    showTooltip();
    popover();
    colorPicker();
    numericStepper();
    sliderIOS();
    rangeSlider();
    buttonLoader();
    inputSelect();
    inputTags();
    tableResponsive();
    handleiCheck();
    timepicker();
    datepicker();
    bDatepicker();
    multiDatesPicker();
    datetimepicker();
    magnificPopup();
    slider();
    liveTile();
    formValidation();
    barCharts();
    textareaAutosize();
    handleProgress();
    $('.autogrow').autogrow();
});


/****  On Resize Functions  ****/
$(window).bind('resize', function (e) {
    window.resizeEvt;
    $(window).resize(function () {
        clearTimeout(window.resizeEvt);
        window.resizeEvt = setTimeout(function () {
            tableResponsive();
        }, 250);
    });
});