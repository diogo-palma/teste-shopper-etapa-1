import { ErrorHandling } from "./index";

describe("Testing ErrorHandling class", () => {
  it("Testing execute function", () => {
    const json = {
      json: (data: object) => {
        expect(data).toEqual({
          code: 404,
          message: 'Not found',
          status: 'error'
        });
      }
    };

    const res = {
      status: (code: string) => {
        expect(code).toBe(404);
        return json;
      }
    };

    const spy1 = jest.spyOn(json, 'json');
    const spy2 = jest.spyOn(res, 'status');

    ErrorHandling.execute(
      {
        code: 404,
        message: 'Not found'
      },
      null,
      res,
      null
    );

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it("Testing execute function", () => {
    const json = {
      json: (data: object) => {
        expect(data).toEqual({ error: 'Error test' });
      }
    };

    const res = {
      status: (code: string) => {
        expect(code).toBe(500);
        return json;
      }
    };

    const spy1 = jest.spyOn(json, 'json');
    const spy2 = jest.spyOn(res, 'status');

    ErrorHandling.execute(
      new Error('test'),
      null,
      res,
      null
    );

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
})