/**
 * controller -
 *
 * we define a controller interface that should be able to describe only the structure of the controller that we should
 * be expecting coming from the user.
 *
 * - controllers cannot have modules and can only have a name.
 * - a controller will have a life cycle defined to allow the dev to hook into events should they need to.
 * */
export interface Controller {
    readonly name: string;

    new: () => Controller;
}
