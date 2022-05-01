import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DropDownAnimation } from '@absa/shared/utils/animations';

@Component({
  selector: 'absa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [DropDownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  openMenu = false;

  toggleMenu(): void {
    this.openMenu = !this.openMenu;
  }
}
