import { RequestService } from '~/framework/util/base-http/request.service';
import { UploadImageDTO } from '../dto/upload-image.dto';
import { DepUtil } from '~/framework/aop/inject';

const UPLOAD_IMAGE = '';

export class UploadImageService extends UploadImageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  uploadImage(fileParams: any) {
    return this.requestService.post(UPLOAD_IMAGE, fileParams);
  }
}
