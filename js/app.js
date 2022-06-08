(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 1e3);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    function remove_class(block, className) {
        document.querySelectorAll(block).forEach((el => {
            if (el.classList.contains(className)) el.classList.remove(className);
        }));
    }
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1500);
    }
    function no_money(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function get_random_2(min, max) {
        return Math.random() * (max - min) + min;
    }
    function add_money(count, block, delay, delay_off) {
        let money = +sessionStorage.getItem("money") + count;
        setTimeout((() => {
            sessionStorage.setItem("money", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    function transl_percent_to_px(percent, invariable) {
        return percent * invariable / 100;
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function get_random_animate() {
        let number = get_random(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let random_item = get_random(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        get_random_animate();
    }), 1e4);
    if (document.querySelector(".main")) {
        sessionStorage.setItem("rocket-1", true);
        if (!sessionStorage.getItem("current-rocket")) sessionStorage.setItem("current-rocket", 1);
        if (sessionStorage.getItem("player-name")) {
            hide_write_name();
            document.querySelector(".name__name-text").textContent = sessionStorage.getItem("player-name");
        }
    }
    if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
        check_main_rocket();
        create_pin();
        setTimeout((() => {
            get_coord_main_rocket();
        }), 2600);
    }
    function hide_write_name() {
        document.querySelector(".select-name").classList.add("_hide");
        document.querySelector(".lobby").classList.remove("_hide");
        document.querySelector(".lobby").classList.add("_active");
    }
    if (document.querySelector(".select-name__input")) {
        let name = document.querySelector(".select-name__input");
        name.addEventListener("input", (e => {
            if (name.value.length >= 6) name.value = name.value.substring(0, 6);
        }));
    }
    function create_pin() {
        let pin = document.createElement("div");
        pin.classList.add("lobby__rocket-pin");
        document.querySelector(".lobby__rocket").append(pin);
    }
    function get_coord_main_rocket() {
        let block = document.querySelector(".lobby__rocket-pin");
        let x = block.getBoundingClientRect().left;
        let y = block.getBoundingClientRect().top;
        let color = "177, 78, 210";
        create_line_canvas(x, y, color, config_canvas.width / 2.3, "3", 100, 120);
    }
    function check_main_rocket() {
        document.querySelector(".lobby__rocket img").setAttribute("src", `img/icons/rocket_${+sessionStorage.getItem("current-rocket")}.svg`);
    }
    const config_shop = {
        price_2: 1500,
        price_3: 2500,
        price_4: 500
    };
    if (document.querySelector(".shop")) {
        write_prices();
        change_state_item_shop();
        if (sessionStorage.getItem("current-rocket")) document.querySelectorAll(".items-shop__item")[+sessionStorage.getItem("current-rocket") - 1].classList.add("_selected"); else {
            sessionStorage.setItem("current-rocket", 1);
            document.querySelectorAll(".items-shop__item")[+sessionStorage.getItem("current-rocket") - 1].classList.add("_selected");
        }
    }
    function change_state_item_shop() {
        if (sessionStorage.getItem("rocket-1")) {
            document.querySelectorAll(".items-shop__item")[0].classList.add("_active");
            document.querySelectorAll(".items-shop__button p")[0].textContent = "select";
        }
        if (sessionStorage.getItem("rocket-2")) {
            document.querySelectorAll(".items-shop__item")[1].classList.add("_active");
            document.querySelectorAll(".items-shop__button p")[1].textContent = "select";
        }
        if (sessionStorage.getItem("rocket-3")) {
            document.querySelectorAll(".items-shop__item")[2].classList.add("_active");
            document.querySelectorAll(".items-shop__button p")[2].textContent = "select";
        }
        if (sessionStorage.getItem("boost")) document.querySelector(".items-shop__boost-count").textContent = sessionStorage.getItem("boost");
    }
    function change_state_active_item_shop(number) {
        document.querySelectorAll(".items-shop__item")[number].classList.add("_anim");
        setTimeout((() => {
            document.querySelectorAll(".items-shop__item")[number].classList.remove("_anim");
        }), 1500);
        remove_class(".items-shop__item", "_selected");
        setTimeout((() => {
            document.querySelectorAll(".items-shop__item")[number].classList.add("_selected");
        }), 1500);
    }
    function write_prices() {
        document.querySelectorAll(".items-shop__price")[0].textContent = config_shop.price_2;
        document.querySelectorAll(".items-shop__price")[1].textContent = config_shop.price_3;
        document.querySelectorAll(".items-shop__price")[2].textContent = config_shop.price_4;
    }
    function click_shop_button(number, price) {
        let current_bank = +sessionStorage.getItem("money");
        if (number < 4) {
            if (sessionStorage.getItem(`rocket-${number}`)) {
                sessionStorage.setItem("current-rocket", number);
                change_state_active_item_shop(number - 1);
            } else if (current_bank >= price) {
                delete_money(price, ".check");
                sessionStorage.setItem(`rocket-${number}`, true);
                change_state_item_shop();
            } else if (current_bank < price) no_money(".check");
        } else if (current_bank >= price) {
            delete_money(price, ".check");
            if (sessionStorage.getItem(`boost`)) sessionStorage.setItem(`boost`, +sessionStorage.getItem(`boost`) + 1); else sessionStorage.setItem(`boost`, 1);
        } else if (current_bank < price) no_money(".check");
    }
    const config_game = {
        program: 1,
        winners: [],
        player_speed_up: .3,
        player_speed_right: .4,
        bot_1_speed_up: .1,
        bot_1_speed_right: .1,
        bot_2_speed_up: .1,
        bot_2_speed_right: .1,
        timerPlayer: false,
        timerBot_1: false,
        timerBot_2: false,
        timerSmokePlayer: false,
        timerSmokeBot_1: false,
        timerSmokeBot_2: false,
        timerDrawLinePlayer: false,
        timerDrawLineBot_1: false,
        timerDrawLineBot_2: false
    };
    const config_canvas = {
        width: 0,
        height: 0,
        color_line_player: 0,
        color_line_dot_1: 0,
        color_line_dot_2: 0
    };
    if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) create_canvas(".main");
    if (document.querySelector(".game")) {
        document.querySelector(".name__name-text").textContent = sessionStorage.getItem("player-name");
        check_rocket();
        start_rocket_smoke();
        if (sessionStorage.getItem("boost")) document.querySelector(".boost-game__count").textContent = sessionStorage.getItem("boost"); else document.querySelector(".boost-game__count").textContent = 0;
        if (+sessionStorage.getItem("money") >= 10) {
            document.querySelector(".block-bet__coins").textContent = 10;
            sessionStorage.setItem("current-bet", 10);
        } else {
            document.querySelector(".block-bet__coins").textContent = 0;
            sessionStorage.setItem("current-bet", 0);
        }
        if (sessionStorage.getItem("auto-coeff")) {
            sessionStorage.setItem("auto-coeff", 2);
            document.querySelector(".auto-cash__coeff").textContent = `x${sessionStorage.getItem("auto-coeff")}`;
        } else document.querySelector(".auto-cash__coeff").textContent = `x${sessionStorage.getItem("auto-coeff")}`;
    }
    function check_rocket() {
        document.querySelector(".square__player img").setAttribute("src", `img/icons/rocket_${+sessionStorage.getItem("current-rocket")}.svg`);
    }
    function start_game() {
        create_canvas(".square");
        delete_money(+sessionStorage.getItem("current-bet"), ".check");
        generate_start_speed();
        moove_player();
        moove_bot_1();
        moove_bot_2();
        generate_line_colors();
        write_color_bot_name();
        document.querySelectorAll(".square__bot-name").forEach((el => {
            el.classList.add("_active");
        }));
        document.querySelector(".controls__body").classList.add("_hold");
        setTimeout((() => {
            config_game.program = 2;
        }), 500);
    }
    function generate_start_speed() {
        if (1 == +sessionStorage.getItem("current-rocket")) {
            config_game.player_speed_up = get_random_2(.11, .25);
            config_game.player_speed_right = get_random_2(.4, .7);
        } else if (2 == +sessionStorage.getItem("current-rocket")) {
            config_game.player_speed_up = get_random_2(.12, .2);
            config_game.player_speed_right = get_random_2(.5, .8);
        } else if (3 == +sessionStorage.getItem("current-rocket")) {
            config_game.player_speed_up = get_random_2(.13, .2);
            config_game.player_speed_right = get_random_2(.6, .8);
        }
        config_game.bot_1_speed_up = get_random_2(.09, .25);
        config_game.bot_1_speed_right = get_random_2(.4, .7);
        config_game.bot_2_speed_up = get_random_2(.08, .25);
        config_game.bot_2_speed_right = get_random_2(.4, .7);
    }
    function generate_line_colors() {
        config_canvas.color_line_player = `${get_random(0, 255)},${get_random(0, 255)},${get_random(0, 255)}`;
        config_canvas.color_line_dot_1 = `${get_random(0, 255)},${get_random(0, 255)},${get_random(0, 255)}`;
        config_canvas.color_line_dot_2 = `${get_random(0, 255)},${get_random(0, 255)},${get_random(0, 255)}`;
    }
    function write_color_bot_name() {
        document.querySelector(".square__bot-name_1").style.color = `rgb(${config_canvas.color_line_dot_1})`;
        document.querySelector(".square__bot-name_1").style.textShadow = `0px 3px 5px rgba(${config_canvas.color_line_dot_1}, 0.71)`;
        document.querySelector(".square__bot-name_2").style.color = `rgb(${config_canvas.color_line_dot_2})`;
        document.querySelector(".square__bot-name_2").style.textShadow = `0px 3px 5px rgba(${config_canvas.color_line_dot_2}, 0.71)`;
    }
    function start_rocket_smoke() {
        config_game.timerSmokePlayer = setInterval((() => {
            create_smoke_rocket(".square__player");
        }), 50);
        config_game.timerSmokeBot_1 = setInterval((() => {
            create_smoke_rocket(".square__bot_1");
        }), 50);
        config_game.timerSmokeBot_2 = setInterval((() => {
            create_smoke_rocket(".square__bot_2");
        }), 50);
    }
    function moove_player() {
        let bottom = -5;
        let left = 3;
        let rotate = 0;
        let player = document.querySelector(".square__player");
        config_game.timerPlayer = setInterval((() => {
            if (left <= 7) clearInterval(config_game.timerSmokePlayer); else if (left <= 15) bottom += config_game.player_speed_up; else if (left > 15 && left <= 30) bottom += 1.5 * config_game.player_speed_up; else if (left > 30 && left <= 45) bottom += 2 * config_game.player_speed_up; else if (left > 45) bottom += 5 * config_game.player_speed_up;
            left += config_game.player_speed_right;
            if (rotate <= 30) rotate += .2;
            player.style.bottom = `${bottom}%`;
            player.style.left = `${left}%`;
            player.style.transform = `rotate(${75 - rotate}deg)`;
            if (left >= 90 || bottom >= 85) {
                let x = transl_percent_to_px(left, config_canvas.width) + 5;
                let y = config_canvas.height - transl_percent_to_px(bottom, config_canvas.height) - 20;
                create_line_canvas(x, y, config_canvas.color_line_player, 0, "2", 100, 150);
                config_game.winners.push(1);
                if (3 == config_game.winners.length) check_win();
                clearInterval(config_game.timerPlayer);
                clearInterval(config_game.timerDrawLine_1);
            }
        }), 35);
    }
    function moove_bot_1() {
        let bottom = 5;
        let left = 1;
        let rotate = 0;
        let player = document.querySelector(".square__bot_1");
        config_game.timerBot_1 = setInterval((() => {
            if (left <= 7) clearInterval(config_game.timerSmokeBot_1); else if (left <= 15) bottom += config_game.bot_1_speed_up; else if (left > 15 && left <= 30) bottom += 1.5 * config_game.bot_1_speed_up; else if (left > 30 && left <= 45) bottom += 2 * config_game.bot_1_speed_up; else if (left > 45) bottom += 4 * config_game.bot_1_speed_up;
            left += config_game.bot_1_speed_right;
            if (rotate <= 30) rotate += .2;
            player.style.bottom = `${bottom}%`;
            player.style.left = `${left}%`;
            player.style.transform = `rotate(${75 - rotate}deg)`;
            if (left >= 90 || bottom >= 85) {
                let x = transl_percent_to_px(left, config_canvas.width) + 5;
                let y = config_canvas.height - transl_percent_to_px(bottom, config_canvas.height) - 10;
                create_line_canvas(x, y, config_canvas.color_line_dot_1, 0, "2", 100, 150);
                config_game.winners.push(2);
                if (3 == config_game.winners.length) check_win();
                clearInterval(config_game.timerBot_1);
            }
        }), 35);
    }
    function moove_bot_2() {
        let bottom = 10;
        let left = 1;
        let rotate = 0;
        let player = document.querySelector(".square__bot_2");
        config_game.timerBot_2 = setInterval((() => {
            if (left <= 7) clearInterval(config_game.timerSmokeBot_2); else if (left <= 15) bottom += config_game.bot_2_speed_up; else if (left > 15 && left <= 30) bottom += 1.5 * config_game.bot_2_speed_up; else if (left > 30 && left <= 45) bottom += 2 * config_game.bot_2_speed_up; else if (left > 45) bottom += 4 * config_game.bot_2_speed_up;
            left += config_game.bot_2_speed_right;
            if (rotate <= 30) rotate += .2;
            player.style.bottom = `${bottom}%`;
            player.style.left = `${left}%`;
            player.style.transform = `rotate(${75 - rotate}deg)`;
            if (left >= 90 || bottom >= 85) {
                let x = transl_percent_to_px(left, config_canvas.width) + 5;
                let y = config_canvas.height - transl_percent_to_px(bottom, config_canvas.height) - 10;
                create_line_canvas(x, y, config_canvas.color_line_dot_2, 0, "2", 100, 150);
                config_game.winners.push(3);
                if (3 == config_game.winners.length) check_win();
                clearInterval(config_game.timerBot_2);
            }
        }), 35);
    }
    function get_speed_up() {
        config_game.player_speed_right *= 1.5;
        config_game.player_speed_up *= 1.3;
        sessionStorage.setItem("boost", +sessionStorage.getItem("boost") - 1);
        document.querySelector(".boost-game__button").classList.add("_hold");
        setTimeout((() => {
            document.querySelector(".boost-game__count").textContent = sessionStorage.getItem("boost");
        }), 500);
    }
    function check_win() {
        if (1 == config_game.winners[0]) {
            document.querySelector(".square__count").textContent = 3 * +sessionStorage.getItem("current-bet");
            add_money(3 * +sessionStorage.getItem("current-bet"), ".check");
            document.querySelector(".square__text").textContent = "you win";
            document.querySelector(".square__info-item").classList.add("_win");
            setTimeout((() => {
                document.querySelector(".square__info-item").classList.add("_active");
            }), 500);
        } else {
            document.querySelector(".square__text").textContent = "you loose";
            document.querySelector(".square__info-item").classList.add("_loose");
            setTimeout((() => {
                document.querySelector(".square__info-item").classList.add("_active");
            }), 500);
        }
        setTimeout((() => {
            write_value_play_agayn_game_button();
            document.querySelector(".controls__body").classList.remove("_hold");
        }), 500);
    }
    function reset_game() {
        write_value_play_button();
        clear_canvas();
        document.querySelector(".square__player").style.bottom = "-5%";
        document.querySelector(".square__player").style.left = "3%";
        document.querySelector(".square__player").style.transform = "rotate(75deg)";
        document.querySelector(".square__bot_1").style.bottom = "5%";
        document.querySelector(".square__bot_1").style.left = "1%";
        document.querySelector(".square__bot_1").style.transform = "rotate(75deg)";
        document.querySelector(".square__bot_2").style.bottom = "10%";
        document.querySelector(".square__bot_2").style.left = "1%";
        document.querySelector(".square__bot_2").style.transform = "rotate(75deg)";
        document.querySelector(".square__info-item").classList.remove("_active");
        setTimeout((() => {
            if (document.querySelector(".square__info-item").classList.contains("_win")) document.querySelector(".square__info-item").classList.remove("_win");
            if (document.querySelector(".square__info-item").classList.contains("_loose")) document.querySelector(".square__info-item").classList.remove("_loose");
        }), 500);
        document.querySelector(".boost-game__button").classList.remove("_hold");
        config_game.winners = [];
        start_rocket_smoke();
        document.querySelectorAll(".square__dot-line").forEach((el => el.remove()));
        document.querySelectorAll(".square__bot-name").forEach((el => {
            el.classList.remove("_active");
        }));
        setTimeout((() => {
            config_game.program = 1;
        }), 200);
    }
    function write_value_play_agayn_game_button() {
        document.querySelector(".button-control__body").classList.add("_again");
        document.querySelector(".button-control__title").textContent = "play again";
    }
    function write_value_play_button() {
        document.querySelector(".button-control__body").classList.remove("_again");
        document.querySelector(".button-control__title").textContent = "start";
    }
    function create_smoke_rocket(block) {
        let dot = document.createElement("div");
        dot.classList.add("square__dot");
        let size = get_random(3, 20);
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        let transform_value = get_random(0, 360);
        dot.style.transform = `rotate(${transform_value}deg)`;
        document.querySelector(block).append(dot);
        setTimeout((() => {
            dot.remove();
        }), 1e3);
    }
    function create_canvas(item) {
        let canvas = document.createElement("canvas");
        canvas.classList.add("ctx");
        let block = document.querySelector(item);
        config_canvas.width = block.clientWidth;
        config_canvas.height = block.clientHeight;
        canvas.setAttribute("width", `${config_canvas.width}px`);
        canvas.setAttribute("height", `${config_canvas.height}px`);
        block.append(canvas);
    }
    function create_line_canvas(x, y, color, start_position, lineWidth, rx, ry) {
        let canvas = document.querySelector(".ctx");
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = lineWidth;
        let gradient = ctx.createLinearGradient(0, config_canvas.height, x, y);
        gradient.addColorStop(0, `rgba(${color},0.1)`);
        gradient.addColorStop(1, `rgba(${color},1)`);
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(start_position, config_canvas.height);
        ctx.quadraticCurveTo(x - rx, y + ry, x, y);
        ctx.stroke();
    }
    function clear_canvas() {
        let canvas = document.querySelector(".ctx");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, config_canvas.width, config_canvas.height);
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        let current_bet = +sessionStorage.getItem("current-bet");
        let current_bank = +sessionStorage.getItem("money");
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".main").classList.add("_active");
        }
        if (targetElement.closest(".select-name__button")) {
            let name = document.querySelector(".select-name__input").value;
            create_canvas(".main");
            check_main_rocket();
            create_pin();
            setTimeout((() => {
                get_coord_main_rocket();
            }), 2600);
            if ("" != name) {
                sessionStorage.setItem("player-name", name);
                hide_write_name();
                document.querySelector(".name__name-text").textContent = sessionStorage.getItem("player-name");
            } else {
                document.querySelector(".select-name__input").classList.add("_anim");
                setTimeout((() => {
                    document.querySelector(".select-name__input").classList.remove("_anim");
                }), 600);
            }
        }
        if (targetElement.closest(".items-shop__button") && 1 == targetElement.closest(".items-shop__item").dataset.shop) {
            sessionStorage.setItem("current-rocket", 1);
            change_state_active_item_shop(0);
        }
        if (targetElement.closest(".items-shop__button") && 2 == targetElement.closest(".items-shop__item").dataset.shop) click_shop_button(2, config_shop.price_2);
        if (targetElement.closest(".items-shop__button") && 3 == targetElement.closest(".items-shop__item").dataset.shop) click_shop_button(3, config_shop.price_3);
        if (targetElement.closest(".items-shop__button") && 4 == targetElement.closest(".items-shop__item").dataset.shop) {
            click_shop_button(4, config_shop.price_4);
            change_state_item_shop();
        }
        if (targetElement.closest(".block-bet__minus")) if (current_bet > 50) {
            sessionStorage.setItem("current-bet", current_bet - 50);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".block-bet__plus")) if (current_bank - 49 > current_bet) {
            sessionStorage.setItem("current-bet", current_bet + 50);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        } else no_money(".check");
        if (targetElement.closest(".block-bet__minus")) if (current_bet > 10) {
            sessionStorage.setItem("current-bet", current_bet - 10);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".block-bet__plus")) if (current_bank - 10 > current_bet) {
            sessionStorage.setItem("current-bet", current_bet + 10);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        } else no_money(".check");
        if (targetElement.closest(".block-bet__min")) if (+sessionStorage.getItem("money") >= 10) {
            sessionStorage.setItem("current-bet", 10);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        } else no_money(".check");
        if (targetElement.closest(".block-bet__max")) if (+sessionStorage.getItem("money") >= 10) {
            sessionStorage.setItem("current-bet", +sessionStorage.getItem("money"));
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        } else no_money(".check");
        if (targetElement.closest(".auto-cash__button_minus")) if (+sessionStorage.getItem("auto-coeff") > .5) {
            sessionStorage.setItem("auto-coeff", sessionStorage.getItem("auto-coeff") - .5);
            document.querySelector(".auto-cash__coeff").textContent = `x${sessionStorage.getItem("auto-coeff")}`;
        }
        if (targetElement.closest(".auto-cash__button_plus")) if (+sessionStorage.getItem("auto-coeff") < 7) {
            sessionStorage.setItem("auto-coeff", +sessionStorage.getItem("auto-coeff") + .5);
            document.querySelector(".auto-cash__coeff").textContent = `x${sessionStorage.getItem("auto-coeff")}`;
        }
        if (targetElement.closest(".controls__button") && 1 == config_game.program) start_game();
        if (targetElement.closest(".controls__button") && 2 == config_game.program) reset_game();
        if (targetElement.closest(".boost-game__button") && 2 == config_game.program) get_speed_up();
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();