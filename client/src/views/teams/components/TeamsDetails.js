import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'

import TeamsFBView from './TeamsFBView'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  layout: {
    width: '100%',
    marginBottom: theme.spacing.unit * 6,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: 0,
    marginBottom: theme.spacing.unit * 3,
    padding: 0,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 6,
      padding: `0 0 ${theme.spacing.unit * 2}px`
    }
  },
  heroContent: {
    maxWidth: 800,
    margin: '0 auto',
    padding: `0 0 ${theme.spacing.unit * 2}px`
  },
  metaContainer: {
    marginTop: `${theme.spacing.unit * 1}px`,
    alignSelf: 'stretch',
    borderRight: '1px solid #CCCCCC'
  },
  teamMeta: {
    margin: `${theme.spacing.unit * 3}px 0 0`,
    paddingLeft: `${theme.spacing.unit * 2}px`,
    textAlign: 'center'
  },
  teamContent: {
    '& h2': {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
    },
    '& h4': {
      padding: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
    },
    '& h6': {
      padding: `0 ${theme.spacing.unit * 3}px 0`
    }
  },
  fbContent: {
    borderTop: '1px solid #CCCCCC',
    width: '90%',
    margin: `${theme.spacing.unit * 3}px auto`,
    paddingTop: `${theme.spacing.unit * 3}px`
  },
  banner: {
    maxWidth: '100%',
    height: 'auto',
    width: '100%'
  },
  avatar: {
    maxWidth: 125,
    height: 125,
    margin: `0 auto ${theme.spacing.unit * 2}px`,
    verticalAlign: 'middle',
    borderRadius: '50%'
  },
  backLink: {
    display: 'block',
    textDecoration: 'none',
    margin: `${theme.spacing.unit * 3}px 0 0`,
    color: theme.palette.secondary.main
  }
})

const TeamsDetails = ({ classes, team }) => {
  let avatar
  if (team.profile.avatar !== undefined && team.profile.avatar !== null) {
    avatar = team.profile.avatar
  } else {
    avatar = process.env.STORAGE_URL + '/module-teams/module-default/aa-avatar-default.png'
  }
  let banner
  if (team.profile.banner !== undefined && team.profile.banner !== null) {
    banner = team.profile.banner
  } else {
    banner = process.env.STORAGE_URL + '/module-teams/module-default/aa-banner-default.png'
  }

  const created = new Date(team.createdAt)

  return (
    <div className='container'>
      <main className={classes.layout}>
        <Link to='/teams/explore' className={classes.backLink}>&larr; Back to all teams</Link>
        <Paper className={classes.paper}>
          <div className={classes.heroContent}>
            <img src={banner} alt={team.name} className={classes.banner} />
            <Grid container>
              <Grid md={3} className={classes.metaContainer}>
                <Grid container className={classes.teamMeta} direction='column' justify='center'>
                  <img src={avatar} alt={team.name} className={classes.avatar} />
                  <Typography variant='subtitle1' paragraph gutterBottom>
                    Members: {team.members.length}
                  </Typography>
                  <Typography variant='subtitle1' paragraph gutterBottom>
                    Financial Beings: 1
                  </Typography>
                  <Typography variant='subtitle1' paragraph gutterBottom>
                    Created: {created.toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
              <Grid md={9}>
                <Grid container className={classes.teamContent} direction='column'>
                  <Typography
                    variant='h2'
                    color='textPrimary'
                    gutterBottom
                  >
                    {team.name}
                  </Typography>
                  <Typography
                    variant='h4'
                    color='textSecondary'
                    gutterBottom
                  >
                    Motto: {team.profile.motto}
                  </Typography>
                  <Typography variant='h6' color='textPrimary' gutterBottom>
                    Description: {team.profile.description}
                  </Typography>
                </Grid>
                <Grid container className={classes.fbContent} direction='column'>
                  <Typography
                    variant='h4'
                    color='textSecondary'
                    gutterBottom
                  >
                    Financial Beings
                  </Typography>
                  <TeamsFBView team={team} />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </main>
    </div>
  )
}
TeamsDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired
}

export default withStyles(styles)(TeamsDetails)
