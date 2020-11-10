import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import BaseRouter from './routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

// Init express
const app = express();


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
	app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Print API errors
app.use((req: Request, res: Response, next) => {
	const err: any = new Error('Not Found');
	err.status = 404;
	next(err);
});
app.use((err: any, req: Request, res: Response, next: any) => {
	console.log(err);
	if (err.status === 404) res.status(404).json({ message: 'Not found' });
	else res.status(500).json({ message: 'Something looks wrong :( !!!' });
});

// Export express instance
export default app;
