'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Controller = void 0;
const echoController_1 = require('./echoController');
const helpController_1 = require('./helpController');
const spamController_1 = require('./spamController');
const randomImgController_1 = require('./randomImgController');
const quoteController_1 = require('./quoteController');
const speakController_1 = require('./speakController');
const speakListController_1 = require('./speakListController');
const instagramController_1 = require('./instagramController');
const instagramProfileController_1 = require('./instagramProfileController');
const dimgController_1 = require('./dimgController');
const myAnimeListController_1 = require('./myAnimeListController');
const saveController_1 = require('./saveController');
const Controller = {
  echo: echoController_1.echoController,
  help: helpController_1.helpController,
  spam: spamController_1.spamController,
  randomImg: randomImgController_1.randomImgController,
  quote: quoteController_1.quoteController,
  speak: speakController_1.speakController,
  speakList: speakListController_1.speakListController,
  instagram: instagramController_1.instagramController,
  instagramProfile: instagramProfileController_1.instagramProfileController,
  dimg: dimgController_1.dimgController,
  myAnimeList: myAnimeListController_1.myAnimeListController,
  save: saveController_1.saveController,
};
exports.Controller = Controller;
//# sourceMappingURL=index.js.map
