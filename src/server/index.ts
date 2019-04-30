// import React from 'react';
import express from 'express';
import cors from 'cors';
import path from 'path';
import chalk from 'chalk';
// import manifestHelpers from 'express-manifest-helpers';
import manifestHelpers from './middleware/manifest-helpers';
import bodyParser from 'body-parser';
import { configureStore } from '../shared/store';
import serverRender from './render';
import paths from '../../config/paths';
import { ErrorRequestHandler, Handler, RequestHandler, Request } from 'express-serve-static-core';
import { Store } from 'redux';

require('dotenv').config();

const app = express();

interface RequestWithStore extends Request {
    store?: Store;
}

const errorHandler: ErrorRequestHandler = (err, _, res) =>
    res.status(404).json({
        status: 'error',
        message: err.message,
        stack:
            // print a nicer stack trace by splitting line breaks and making them array items
            process.env.NODE_ENV === 'development' &&
            (err.stack || '')
                .split('\n')
                .map((line: string) => line.trim())
                .map((line: string) => line.split(path.sep).join('/'))
                .map((line: string) =>
                    line.replace(
                        process
                            .cwd()
                            .split(path.sep)
                            .join('/'),
                        '.'
                    )
                ),
    });

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
    app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
    app.use('/favicon.ico', (_, res) => res.send(''));
}

app.use(cors());

app.use(bodyParser.json());

const addStore: RequestHandler = (req: RequestWithStore, res, next) => {
    req.store = configureStore();
    return next();
};

app.use(addStore);

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`,
    })
);

app.use(serverRender());

app.use(errorHandler);

app.listen(process.env.PORT || 8500, () => {
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`)
    );
});

export default app;
