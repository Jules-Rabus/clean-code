
export default class mongoConfig {
  static resolve(): string {

    return 'mongodb://root:password@localhost:27018/app_test';

    //throw new InvalidMongoUriError();
  }
}