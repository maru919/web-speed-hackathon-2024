import { ArrowBack, NavigateNext, Close, Favorite, FavoriteBorder, Search } from '@mui/icons-material';

type Props = {
  color: string;
  height: number;
  type: 'ArrowBack' | 'NavigateNext' | 'Close' | 'Favorite' | 'FavoriteBorder' | 'Search';
  width: number;
};

const Icons = {
  ArrowBack,
  NavigateNext,
  Close,
  Favorite,
  FavoriteBorder,
  Search,
};

export const SvgIcon: React.FC<Props> = ({ color, height, type, width }) => {
  const Icon = Icons[type];
  return <Icon style={{ color, height, width }} />;
};
