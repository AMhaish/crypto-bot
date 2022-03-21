import express from "./express";
import { Container, IInstanceWrapper } from "addict-ioc";
import { Application } from "express";

function routes(app: Application, ioc: Container<IInstanceWrapper<any>>): void {
  express(app, ioc);
}
export default routes;