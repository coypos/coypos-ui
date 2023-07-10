import { ThingRequestModel } from "./ThingRequest";

export interface ThingModel extends ThingRequestModel {
  /**Self-generated unique Thing ID */
  id: number;

  /**Requested string but in reverse */
  sampleGeneratedString?: string;

  /**Length of the requested string */
  sampleGeneratedInteger: number;
}
