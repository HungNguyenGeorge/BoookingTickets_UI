import PropTypes from 'prop-types';
// @mui
import { alpha, styled, ThemeProvider } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Button, Tooltip } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import { ThemeContext } from '@emotion/react';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index }) {
  const { cover, title, view, comment, share, author, createdAt } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:archive-outline' },
    { number: view, icon: 'eva:eye-fill' },
    // { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{
        position: 'relative',
        ":hover": {
          boxShadow: "0 2px 15px 0px rgba(0,0,0,0.4 )"
        }
      }}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          />
          <StyledAvatar
            alt={author.name}
            src={author.avatarUrl}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />

          <StyledCover alt={title} src={cover} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: "1rem" }}>
            {fDate(createdAt, null)}
          </Typography>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
              cursor: 'pointer'
            }}
          >
            {title}
          </StyledTitle>

          <StyledInfo>
            <Tooltip title={`Total: ${10}`}>
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'default',
                  mr: 1
                }}
              >
                <Iconify icon={"eva:inbox-fill"} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(10)}</Typography>
              </Box>
            </Tooltip>
            <Tooltip title={`Available: ${10}`}>
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'default'
                }}
              >
                <Iconify icon={"eva:checkmark-circle-outline"} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption" >{fShortenNumber(10)}</Typography>
              </Box>
            </Tooltip>

          </StyledInfo>
          <Button variant="contained" size="small" sx={{
            float: "right",
            marginBottom: "24px"
          }}>
            Book
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
