/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    user?: import('./bff/types').User;
  }
}