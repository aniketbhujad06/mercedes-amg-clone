$(document).ready(function () {

    const $menuToggle = $('.menu-toggle');
    const $menuDrawer = $('.menu-drawer');
    const $menuDrawerClose = $('.menu-drawer-close');
    const $overlay = $('<div class="drawer-overlay"></div>').appendTo('body');

    $menuToggle.on('click', function () {
        $menuDrawer.addClass('open');
        $overlay.addClass('show');
        $('body').css('overflow', 'hidden'); // Prevent background scrolling
    });

    $menuDrawerClose.add($overlay).on('click', function () {
        $menuDrawer.removeClass('open');
        $overlay.removeClass('show');
        $('body').css('overflow', '');
    });


    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 50) {
            $('.sub-header').addClass('scrolled');
        } else {
            $('.sub-header').removeClass('scrolled');
        }
    });


    const assets = {
        black: { name: "Obsidian Black Metallic", img: "assets/images/g63-black.avif", bg: "#080808" },
        grey: { name: "Selenite Grey Metallic", img: "assets/images/g63-grey-2.avif", bg: "#7a7d84" },
        sand: { name: "Desert Sand Non-Metallic", img: "assets/images/g63-sand.avif", bg: "#c2b29c" },
        'magno-grey': { name: "monza grey magno", img: "assets/images/g63-magno-grey.avif", bg: "#595856" },
        'silver-metallic': { name: "High-tech silver metallic", img: "assets/images/g63-silver-metallic.avif", bg: "#a1a6ab" },
        'vintage-blue': { name: "vintage blue non-metallic", img: "assets/images/g63-vintage-blue.avif", bg: "#8da6ba" },
        'white': { name: "White", img: "assets/images/g63-white.avif", bg: "#FFFFFF" },
        'yellow': { name: "AMG solarbeam yellow", img: "assets/images/g63-yellow.avif", bg: "#f3c31e" },
        'orange': { name: "orange magno", img: "assets/images/g63-orange.avif", bg: "#d53f1c" },
        'blue-metallic': { name: "rubellite red metallic", img: "assets/images/g63-brown.avif", bg: "#523135" },
        'deep-blue': { name: "deep blue", img: "assets/images/g63-deep-blue.avif", bg: "#24354c" },
        'brilliant-blue': { name: "ocean blue metallic", img: "assets/images/g63-emreld-blue-green.avif", bg: "#274554" },
        'emerald-green': { name: "Emerald Green Metallic", img: "assets/images/g63-emerald-green.avif", bg: "#14271c" }
    };

    function renderSwatches() {
        const $swatchesList = $('.swatches-list');
        if ($swatchesList.length === 0) return;
        $swatchesList.empty();

        let isFirst = true;
        Object.keys(assets).forEach(key => {
            const item = assets[key];
            const $swatch = $(`
                <div class="swatch ${isFirst ? 'active' : ''}" data-key="${key}">
                    <div class="swatch-inner" style="background-color: ${item.bg};"></div>
                </div>
            `);
            $swatchesList.append($swatch);

            if (isFirst) {
                updateCarImage(item.img, item.name);
                isFirst = false;
            }
        });
    }

    $(document).on('click', '.swatch', function () {
        $('.swatch').removeClass('active');
        $(this).addClass('active');

        const key = $(this).data('key');
        const item = assets[key];
        updateCarImage(item.img, item.name);
    });

    function updateCarImage(src, name) {
        const $img = $('.hero-main-car');
        $img.addClass('changing');

        setTimeout(() => {
            $img.attr('src', src);
            $('.color-name-display').text(name);
            $img.removeClass('changing');
        }, 300);
    }

    if ($('.swatches-list').length > 0) {
        renderSwatches();
    }

    $('.hero-model-btn').on('click', function () {
        $('.hero-model-btn').removeClass('active btn-light').addClass('btn-outline-light');
        $(this).addClass('active btn-light').removeClass('btn-outline-light');

        const model = $(this).data('model');
        if (model === 'g63') {
            $('.hero-title').text('Mercedes-AMG G 63');
            $('.hero-badge').text('The Legend Grows');
            $('.tech-val-hp').text('585 HP + 20 HP');
        } else {
            $('.hero-title').text('Mercedes G-Class AMG Line');
            $('.hero-badge').text('Iconic Styling');
            $('.tech-val-hp').text('450 HP + 20 HP');
        }
    });


    const $track = $('.highlights-track');
    const $prevBtn = $('.slider-btn-prev');
    const $nextBtn = $('.slider-btn-next');
    let scrollPosition = 0;

    if ($track.length > 0) {
        const cardWidth = 480; // Card width + margins

        $nextBtn.on('click', function () {
            const trackWidth = $track.outerWidth();
            const viewWidth = $('.highlights-wrapper').width();
            const maxScroll = trackWidth - viewWidth;

            if (scrollPosition < maxScroll) {
                scrollPosition += cardWidth;
                if (scrollPosition > maxScroll) scrollPosition = maxScroll;
                $track.css('transform', `translateX(-${scrollPosition}px)`);
            }
        });

        $prevBtn.on('click', function () {
            if (scrollPosition > 0) {
                scrollPosition -= cardWidth;
                if (scrollPosition < 0) scrollPosition = 0;
                $track.css('transform', `translateX(-${scrollPosition}px)`);
            }
        });

        $(window).on('resize', function () {
            scrollPosition = 0;
            $track.css('transform', 'translateX(0)');
        });
    }


    $('.validated-form').on('submit', function (e) {
        e.preventDefault();
        let isValid = true;
        const $form = $(this);

        $form.find('input[required], select[required]').each(function () {
            const $input = $(this);
            if (!$input.val() || $input.val().trim() === '') {
                $input.addClass('is-invalid');
                isValid = false;
            } else {
                $input.removeClass('is-invalid');
            }
        });

        const $email = $form.find('input[type="email"]');
        if ($email.length > 0 && $email.val()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test($email.val())) {
                $email.addClass('is-invalid');
                isValid = false;
            } else {
                $email.removeClass('is-invalid');
            }
        }

        const $phone = $form.find('input[type="tel"]');
        if ($phone.length > 0 && $phone.val()) {
            const phoneRegex = /^[0-9+\s-]{8,15}$/;
            if (!phoneRegex.test($phone.val())) {
                $phone.addClass('is-invalid');
                isValid = false;
            } else {
                $phone.removeClass('is-invalid');
            }
        }

        const $checkbox = $form.find('input[type="checkbox"][required]');
        if ($checkbox.length > 0) {
            if (!$checkbox.is(':checked')) {
                $checkbox.addClass('is-invalid');
                isValid = false;
            } else {
                $checkbox.removeClass('is-invalid');
            }
        }

        if (isValid) {
            showSuccessModal();
            $form[0].reset();
        }
    });

    function showSuccessModal() {
        const $modal = $('<div class="success-modal">' +
            '<div class="success-icon"><i class="bi bi-check-circle-fill">✓</i></div>' +
            '<div class="success-title">Thank You!</div>' +
            '<div class="success-desc">Your request has been successfully recorded. A Mercedes-Benz representative will contact you shortly.</div>' +
            '<button class="sub-header-btn sub-header-btn-solid modal-close-btn" style="width:100%;">Close Window</button>' +
            '</div>').appendTo('body');

        const $modalOverlay = $('<div class="drawer-overlay show" style="z-index: 2999;"></div>').appendTo('body');

        setTimeout(() => {
            $modal.addClass('show');
        }, 50);

        $modal.find('.modal-close-btn').add($modalOverlay).on('click', function () {
            $modal.removeClass('show');
            $modalOverlay.removeClass('show');
            setTimeout(() => {
                $modal.remove();
                $modalOverlay.remove();
            }, 300);
        });
    }

    $('.validated-form').find('input, select').on('input change', function () {
        if ($(this).val() && $(this).val().trim() !== '') {
            $(this).removeClass('is-invalid');
        }
    });

    $('.brand-tab-btn').on('click', function () {
        $('.brand-tab-btn').removeClass('active');
        $(this).addClass('active');

        const filter = $(this).data('filter');
        const $cards = $('.model-card');

        if (filter === 'all') {
            $cards.fadeIn(300);
        } else {
            $cards.hide();
            $cards.filter(`[data-brand="${filter}"]`).fadeIn(300);
        }
    });

    $('.model-card').on('click', function () {
        $('.model-card').removeClass('active');
        $(this).addClass('active');

        const selectedModel = $(this).find('.model-card-title').text();
        $('#selectedModelField').val(selectedModel);
    });


    const $loanRange = $('#loanRange');
    const $tenureRange = $('#tenureRange');
    const $loanValLabel = $('#loanVal');
    const $tenureValLabel = $('#tenureVal');

    if ($loanRange.length > 0) {
        function updateCalculations() {
            const loanAmount = parseInt($loanRange.val());
            const tenureMonths = parseInt($tenureRange.val());
            const annualInterestRate = 8.5; // Fixed 8.5% annual rate
            const monthlyInterestRate = (annualInterestRate / 12) / 100;

            // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
            let emi = 0;
            if (monthlyInterestRate > 0) {
                emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                    (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
            } else {
                emi = loanAmount / tenureMonths;
            }

            const totalRepayment = emi * tenureMonths;
            const totalInterest = totalRepayment - loanAmount;
            const downPayment = loanAmount * 0.20; // 20% down payment

            $loanValLabel.text('₹ ' + (loanAmount / 100000).toFixed(1) + ' Lakh');
            $tenureValLabel.text(tenureMonths + ' Months');

            $('#emiResult').text('₹ ' + Math.round(emi).toLocaleString('en-IN'));
            $('#interestResult').text('₹ ' + Math.round(totalInterest).toLocaleString('en-IN'));
            $('#downPaymentResult').text('₹ ' + Math.round(downPayment).toLocaleString('en-IN'));
        }

        $loanRange.add($tenureRange).on('input', updateCalculations);
        updateCalculations(); // Initial load run
    }
});
