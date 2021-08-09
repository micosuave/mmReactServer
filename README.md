# Motion Maker Typescript Server
## for Motion Maker React

### Installation

Note: Firebase configurations need to be placed in ./config for the server to run
You must also remember to symlink as the dir 'public'
`ln -s /path/to/motionMakerReact/build /path/to/mmReactServer/public`

### Environment

The following environment variables need to be set
 `              "SERVERNAME"
                "NODE_ENV"
                "pm2"
                "env"
                "courtListenerAPItoken"
                "pacerUserID"
                "pacerPassWD"`

### About CourtListener API
Motion Maker searches PACER via the [Free Law Project](https://free.law)'s [CourtListener](https://www.courtlistener.com/)  REST [API](https://www.courtlistener.com/api/rest-info/) for a docket information that is later transformed on the client. 