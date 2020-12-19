import { echoController } from './echoController';
import { helpController } from './helpController';
import { spamController } from './spamController';
import { randomImgController } from './randomImgController';
import { quoteController } from './quoteController';
import { speakController } from './speakController';
import { speakListController } from './speakListController';
import { instagramController } from './instagramController';
import { instagramProfileController } from './instagramProfileController';
import { dimgController } from './dimgController';
import { myAnimeListController } from './myAnimeListController';
import { saveController } from './saveController';

const Controller = {
  echo: echoController,
  help: helpController,
  spam: spamController,
  randomImg: randomImgController,
  quote: quoteController,
  speak: speakController,
  speakList: speakListController,
  instagram: instagramController,
  instagramProfile: instagramProfileController,
  dimg: dimgController,
  myAnimeList: myAnimeListController,
  save: saveController,
};

export { Controller };
