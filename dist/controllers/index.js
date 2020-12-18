"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const echoController_1 = require("./echoController");
const helpController_1 = require("./helpController");
const spamController_1 = require("./spamController");
const randomImgController_1 = require("./randomImgController");
const quoteController_1 = require("./quoteController");
const speakController_1 = require("./speakController");
const speakListController_1 = require("./speakListController");
const instagramController_1 = require("./instagramController");
const instagramProfileController_1 = require("./instagramProfileController");
const dimgController_1 = require("./dimgController");
const Controller = {
    echo: echoController_1.echoController,
    help: helpController_1.helpController,
    spam: spamController_1.spamController,
    randomImg: randomImgController_1.randomImgController,
    quote: quoteController_1.quoteController,
    speak: speakController_1.speakController,
    speakList: speakListController_1.speakListController,
    instagramController: instagramController_1.instagramController,
    instagramProfileController: instagramProfileController_1.instagramProfileController,
    dimgController: dimgController_1.dimgController,
};
exports.Controller = Controller;
//# sourceMappingURL=index.js.map