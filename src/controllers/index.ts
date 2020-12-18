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

const Controller = {
  echo: echoController,
  help: helpController,
  spam: spamController,
  randomImg: randomImgController,
  quote: quoteController,
  speak: speakController,
  speakList: speakListController,
  instagramController: instagramController,
  instagramProfileController: instagramProfileController,
  dimgController: dimgController,
};

export { Controller };
