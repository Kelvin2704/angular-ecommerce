import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastRef, TOAST_CONFIG } from 'ngx-toastr';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.scss']
})
export class CustomToastComponent {
  title: string = '';
  message: string = '';
  toastType: string = 'success';

  constructor(
    @Inject(TOAST_CONFIG) private toastConfig: any,
    public toastRef: ToastRef<any>
  ) {
    const toastPackage = this.toastConfig.toastPackage;

    // Custom data passed via toastPackage.config
    const customData = toastPackage.config.custom || {};
    this.title = customData.title || 'Default Title';
    this.message = customData.message || 'Default message';
    this.toastType = customData.toastType || 'success';  // Custom 'toastType'
  }

  viewCart() {
    // Navigate to the cart
    console.log('Navigating to cart...');
  }

  close() {
    this.toastRef.close();
  }
}
