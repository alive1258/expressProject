import { RequestHandler, Request, Response, NextFunction } from 'express';
//এটা একটি HOC বা Higher Order Function যায় কাজ হলো asynchronous অপারেশন হ্যান্ডেল করা।
// এটি একটি RequestHandler টাইপ function রিসিভ করে এবং রিটার্ন করে আরেকটি middleware ফাংশন যার ভেতর একটি Promise resolve হয়।
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

export default catchAsync;
