import { echoController } from './echoController';
import { helpController } from './helpController';
import { spamController } from './spamController';
import { randomImgController } from './randomImgController';
import { quoteController } from './quoteController';

const Controller = {
  echo: echoController,
  help: helpController,
  spam: spamController,
  randomImg: randomImgController,
  quote: quoteController,
};

export { Controller };
