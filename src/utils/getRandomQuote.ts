import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import Nietzsche from '@/theme/assets/images/portraits/nietzsche.jpg';
import Winston from '@/theme/assets/images/portraits/winston.jpg';
import Disney from '@/theme/assets/images/portraits/disney.jpg';
import Aurelius from '@/theme/assets/images/portraits/ma.jpg';
import Seneca from '@/theme/assets/images/portraits/s.jpg';
import Coco from '@/theme/assets/images/portraits/cc.jpg';
import Winfrey from '@/theme/assets/images/portraits/ow.jpg';
import Jobs from '@/theme/assets/images/portraits/sj.jpg';
import Edison from '@/theme/assets/images/portraits/te.jpg';
import Confucius from '@/theme/assets/images/portraits/q.jpg';
import Thoreau from '@/theme/assets/images/portraits/hdt.jpg';
import Einstein from '@/theme/assets/images/portraits/ae.jpg';
import Ghandi from '@/theme/assets/images/portraits/mg.jpg';
import Purkey from '@/theme/assets/images/portraits/wwp.jpg';
import Jordan from '@/theme/assets/images/portraits/mj.jpg';
import Shaw from '@/theme/assets/images/portraits/gbs.jpg';
import James from '@/theme/assets/images/portraits/wj.jpg';
import ElRoosevelt from '@/theme/assets/images/portraits/er.jpg';
import Ford from '@/theme/assets/images/portraits/hf.jpg';
import Nieburh from '@/theme/assets/images/portraits/rn.jpg';
import Collier from '@/theme/assets/images/portraits/rc.jpg';
import Twain from '@/theme/assets/images/portraits/mt.jpg';
import Epictetus from '@/theme/assets/images/portraits/e.jpg';
import Goethe from '@/theme/assets/images/portraits/jwg.png';
import West from '@/theme/assets/images/portraits/mw.jpg';
import LaoTzu from '@/theme/assets/images/portraits/lt.jpg';
import Baruch from '@/theme/assets/images/portraits/bmb.jpg';
import Wilde from '@/theme/assets/images/portraits/owi.jpg';
import Shakespeare from '@/theme/assets/images/portraits/ws.jpg';
import ThRoosevelt from '@/theme/assets/images/portraits/tr.jpg';
import Rowling from '@/theme/assets/images/portraits/jkr.jpg';
import Frankl from '@/theme/assets/images/portraits/frankl.jpg';

import { QuoteKeys } from '@/types/schemas/quotes';

export default function getRandomQuote() {
	const Quotes: [QuoteKeys, ImageSourcePropType][] = [
		['quotes:MarcusAurelius.quotes.1', Aurelius],
		['quotes:MarcusAurelius.quotes.2', Aurelius],
		['quotes:MarcusAurelius.quotes.3', Aurelius],
		['quotes:MarcusAurelius.quotes.4', Aurelius],
		['quotes:MarcusAurelius.quotes.5', Aurelius],
		['quotes:MarcusAurelius.quotes.6', Aurelius],
		['quotes:MarcusAurelius.quotes.7', Aurelius],
		['quotes:MarcusAurelius.quotes.8', Aurelius],
		['quotes:MarcusAurelius.quotes.9', Aurelius],
		['quotes:MarcusAurelius.quotes.10', Aurelius],
		['quotes:MarcusAurelius.quotes.11', Aurelius],
		['quotes:WaltDisney.quotes.1', Disney],
		['quotes:WaltDisney.quotes.2', Disney],
		['quotes:WaltDisney.quotes.3', Disney],
		['quotes:WaltDisney.quotes.4', Disney],
		['quotes:WaltDisney.quotes.5', Disney],
		['quotes:WaltDisney.quotes.6', Disney],
		['quotes:WaltDisney.quotes.7', Disney],
		['quotes:WaltDisney.quotes.8', Disney],
		['quotes:WaltDisney.quotes.9', Disney],
		['quotes:WaltDisney.quotes.10', Disney],
		['quotes:SteveJobs.quotes.1', Jobs],
		['quotes:SteveJobs.quotes.2', Jobs],
		['quotes:SteveJobs.quotes.3', Jobs],
		['quotes:SteveJobs.quotes.4', Jobs],
		['quotes:SteveJobs.quotes.5', Jobs],
		['quotes:OprahWinfrey.quotes.1', Winfrey],
		['quotes:OprahWinfrey.quotes.2', Winfrey],
		['quotes:OprahWinfrey.quotes.3', Winfrey],
		['quotes:OprahWinfrey.quotes.4', Winfrey],
		['quotes:ThomasA.Edison.quotes.1', Edison],
		['quotes:ThomasA.Edison.quotes.2', Edison],
		['quotes:Confucius.quotes.1', Confucius],
		['quotes:HenryDavidThoreau.quotes.1', Thoreau],
		['quotes:AlbertEinstein.quotes.1', Einstein],
		['quotes:MahatmaGandhi.quotes.1', Ghandi],
		['quotes:MahatmaGandhi.quotes.2', Ghandi],
		['quotes:WilliamW.Purkey.quotes.1', Purkey],
		['quotes:MichaelJordan.quotes.1', Jordan],
		['quotes:MichaelJordan.quotes.2', Jordan],
		['quotes:GeorgeBernardShaw.quotes.1', Shaw],
		['quotes:WilliamJames.quotes.1', James],
		['quotes:WilliamJames.quotes.2', James],
		['quotes:WilliamJames.quotes.3', James],
		['quotes:WilliamJames.quotes.4', James],
		['quotes:WilliamJames.quotes.5', James],
		['quotes:WilliamJames.quotes.6', James],
		['quotes:WilliamJames.quotes.7', James],
		['quotes:WilliamJames.quotes.8', James],
		['quotes:WinstonS.Churchill.quotes.1', Winston],
		['quotes:WinstonS.Churchill.quotes.2', Winston],
		['quotes:EleanorRoosevelt.quotes.1', ElRoosevelt],
		['quotes:EleanorRoosevelt.quotes.2', ElRoosevelt],
		['quotes:EleanorRoosevelt.quotes.3', ElRoosevelt],
		['quotes:EleanorRoosevelt.quotes.4', ElRoosevelt],
		['quotes:HenryFord.quotes.1', Ford],
		['quotes:ReinholdNiebuhr.quotes.1', Nieburh],
		['quotes:RobertCollier.quotes.1', Collier],
		['quotes:FriedrichNietzsche.quotes.1', Nietzsche],
		['quotes:FriedrichNietzsche.quotes.2', Nietzsche],
		['quotes:FriedrichNietzsche.quotes.3', Nietzsche],
		['quotes:MarkTwain.quotes.1', Twain],
		['quotes:Epictetus.quotes.1', Epictetus],
		['quotes:Epictetus.quotes.2', Epictetus],
		['quotes:Epictetus.quotes.3', Epictetus],
		['quotes:JohannWolfgangvonGoethe.quotes.1', Goethe],
		['quotes:JohannWolfgangvonGoethe.quotes.2', Goethe],
		['quotes:JohannWolfgangvonGoethe.quotes.3', Goethe],
		['quotes:JohannWolfgangvonGoethe.quotes.4', Goethe],
		['quotes:JohannWolfgangvonGoethe.quotes.5', Goethe],
		['quotes:JohannWolfgangvonGoethe.quotes.6', Goethe],
		['quotes:JohannWolfgangvonGoethe.quotes.7', Goethe],
		['quotes:JohannWolfgangvonGoethe.quotes.8', Goethe],
		['quotes:JohannWolfgangvonGoethe.quotes.9', Goethe],
		['quotes:JohannWolfgangvonGoethe.quotes.10', Goethe],
		['quotes:Seneca.quotes.1', Seneca],
		['quotes:Seneca.quotes.2', Seneca],
		['quotes:Seneca.quotes.3', Seneca],
		['quotes:Seneca.quotes.4', Seneca],
		['quotes:Seneca.quotes.5', Seneca],
		['quotes:Seneca.quotes.6', Seneca],
		['quotes:Seneca.quotes.7', Seneca],
		['quotes:CocoChanel.quotes.1', Coco],
		['quotes:CocoChanel.quotes.2', Coco],
		['quotes:CocoChanel.quotes.3', Coco],
		['quotes:LaoTzu.quotes.1', LaoTzu],
		['quotes:MaeWest.quotes.1', West],
		['quotes:MaeWest.quotes.2', West],
		['quotes:BernardM.Baruch.quotes.1', Baruch],
		['quotes:J.K.Rowling.quotes.1', Rowling],
		['quotes:OscarWilde.quotes.1', Wilde],
		['quotes:WilliamShakespeare.quotes.1', Shakespeare],
		['quotes:TheodoreRoosevelt.quotes.1', ThRoosevelt],
		['quotes:TheodoreRoosevelt.quotes.2', ThRoosevelt],
		['quotes:TheodoreRoosevelt.quotes.3', ThRoosevelt],
		['quotes:TheodoreRoosevelt.quotes.4', ThRoosevelt],
		['quotes:ViktorFrankl.quotes.1', Frankl],
		['quotes:ViktorFrankl.quotes.2', Frankl],
		['quotes:ViktorFrankl.quotes.3', Frankl],
		['quotes:ViktorFrankl.quotes.4', Frankl],
		['quotes:ViktorFrankl.quotes.5', Frankl],
	];

	const random = Math.floor(Math.random() * Quotes.length);

	return Quotes[random];
}
