import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import Nietzsche from '@/theme/assets/images/portraits/nietzsche.jpg';
import Winston from '@/theme/assets/images/portraits/winston.jpg';
import Disney from '@/theme/assets/images/portraits/disney.jpg';
import ma from '@/theme/assets/images/portraits/ma.jpg';
import s from '@/theme/assets/images/portraits/s.jpg';
import cc from '@/theme/assets/images/portraits/cc.jpg';
import ow from '@/theme/assets/images/portraits/ow.jpg';
import sj from '@/theme/assets/images/portraits/sj.jpg';
import te from '@/theme/assets/images/portraits/te.jpg';
import q from '@/theme/assets/images/portraits/q.jpg';
import hdt from '@/theme/assets/images/portraits/hdt.jpg';
import ae from '@/theme/assets/images/portraits/ae.jpg';
import mg from '@/theme/assets/images/portraits/mg.jpg';
import wwp from '@/theme/assets/images/portraits/wwp.jpg';
import mj from '@/theme/assets/images/portraits/mj.jpg';
import gbs from '@/theme/assets/images/portraits/gbs.jpg';
import wj from '@/theme/assets/images/portraits/wj.jpg';
import er from '@/theme/assets/images/portraits/er.jpg';
import hf from '@/theme/assets/images/portraits/hf.jpg';
import rn from '@/theme/assets/images/portraits/rn.jpg';
import rc from '@/theme/assets/images/portraits/rc.jpg';
import mt from '@/theme/assets/images/portraits/mt.jpg';
import e from '@/theme/assets/images/portraits/e.jpg';
import jwg from '@/theme/assets/images/portraits/jwg.png';
import mw from '@/theme/assets/images/portraits/mw.jpg';
import lt from '@/theme/assets/images/portraits/lt.jpg';
import bmb from '@/theme/assets/images/portraits/bmb.jpg';
import owi from '@/theme/assets/images/portraits/owi.jpg';
import ws from '@/theme/assets/images/portraits/ws.jpg';
import tr from '@/theme/assets/images/portraits/tr.jpg';
import jkr from '@/theme/assets/images/portraits/jkr.jpg';

export default function useRandomQuote() {
	const Quotes: [string, ImageSourcePropType][] = [
		['quotes:ma1', ma],
		['quotes:wd1', Disney],
		['quotes:ow1', ow],
		['quotes:sj1', sj],
		['quotes:te1', te],
		['quotes:q1', q],
		['quotes:hdt1', hdt],
		['quotes:ae1', ae],
		['quotes:mg1', mg],
		['quotes:mg2', mg],
		['quotes:wwp1', wwp],
		['quotes:mj1', mj],
		['quotes:gbs1', gbs],
		['quotes:wj1', wj],
		['quotes:wj2', wj],
		['quotes:er1', er],
		['quotes:ma2', ma],
		['quotes:ma3', ma],
		['quotes:wsc1', Winston],
		['quotes:hf1', hf],
		['quotes:rn1', rn],
		['quotes:rc1', rc],
		['quotes:wsc2', Winston],
		['quotes:fn1', Nietzsche],
		['quotes:fn2', Nietzsche],
		['quotes:er2', er],
		['quotes:er3', er],
		['quotes:er4', er],
		['quotes:mt1', mt],
		['quotes:wj3', wj],
		['quotes:wj4', wj],
		['quotes:e1', e],
		['quotes:e2', e],
		['quotes:e3', e],
		['quotes:jwg1', jwg],
		['quotes:jwg2', jwg],
		['quotes:s1', s],
		['quotes:s2', s],
		['quotes:s3', s],
		['quotes:cc1', cc],
		['quotes:cc2', cc],
		['quotes:cc3', cc],
		['quotes:ma4', ma],
		['quotes:lt1', lt],
		['quotes:mw1', mw],
		['quotes:bmb1', bmb],
		['quotes:jkr1', jkr],
		['quotes:owi1', owi],
		['quotes:ws1', ws],
		['quotes:te2', te],
		['quotes:tr1', tr],
		['quotes:tr2', tr],
		['quotes:tr3', tr],
	];

	const random = Math.floor(Math.random() * Quotes.length);

	return Quotes[random];
}
