import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ThemeService } from '../../../theme.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('nav', { static: false }) navRef!: ElementRef<HTMLDivElement>;
  navHeight = 0;
  private resizeObserver: any; // النوع أي لأننا قد نستخدم polyfill
  private isBrowser = false;

  constructor(
    public _ThemeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) return;
    this.menu = document.getElementById('navbar-default');
  }

  menu: any;
  isMenuOpen: boolean = false;

  menuList: any = [
    {
      id: 0,
      link: 'home',
      name: 'Home',
      isActive: true,
    },
    {
      id: 1,
      link: 'about',
      name: 'About',
      isActive: false,
    },
    {
      id: 2,
      link: 'auth/login',
      name: 'Login',
      isActive: false,
    },
    {
      id: 3,
      link: 'auth/register',
      name: 'Register',
      isActive: false,
    },
  ];
  activate(id: number) {
 
    for (let i = 0; i < this.menuList.length; i++) {
      this.menuList[i].isActive=false
    }
    this.menuList[id].isActive = !this.menuList[id].isActive;
    
  }
  toggleTheme() {
    this._ThemeService.toggleDarkMode();
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // ننتظر frame واحد عشان DOM يستقر (مهم لو في تغييرات CSS/Layout)
    setTimeout(() => {
      this.updateHeight();

      // لو الـ ResizeObserver موجود نستخدمه مباشرة
      if (typeof (window as any).ResizeObserver !== 'undefined') {
        this.initObserver();
        return;
      }

      // لو مش موجود نحاول نحمّل polyfill ديناميكياً
      import('@juggle/resize-observer')
        .then((mod) => {
          // attach polyfill to window
          (window as any).ResizeObserver = mod.ResizeObserver;
          this.initObserver();
        })
        .catch((err) => {
          console.warn(
            'ResizeObserver polyfill failed, falling back to window.resize',
            err
          );
          // fallback بسيط: نعتمد على resize event فقط
        });
    });
  }

  getScrollbarWidth(): number {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';

    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
  }
  private initObserver() {
    if (this.resizeObserver) {
      try {
        this.resizeObserver.disconnect();
      } catch {}
    }

    this.resizeObserver = new (window as any).ResizeObserver(() => {
      this.updateHeight();
    });

    if (this.navRef && this.navRef.nativeElement) {
      this.resizeObserver.observe(this.navRef.nativeElement);
    }
  }

  @HostListener('window:resize')
  onResize() {
    // fallback: لو الـ observer مش شغال
    this.updateHeight();
  }

  private updateHeight() {
    if (!this.isBrowser) return;
    const el = this.navRef?.nativeElement as HTMLElement | undefined;
    if (!el) return;

    // استخدم getBoundingClientRect لقياس دقيق
    const rect = el.getBoundingClientRect();
    const styles = window.getComputedStyle(el);
    const marginBottom = parseInt(styles.marginBottom || '0', 10) || 0;

    // اضبط قيمة navHeight وحوّلها لعدد صحيح عشان مايبقاش فيه كسور تسبب تخطيء
    this.navHeight = Math.ceil(rect.height + marginBottom);

    const menu = document.getElementById('navbar-default');
    if (menu && window.innerWidth < 769) {
      menu.style.top = `${this.navHeight + 5}px`;
      menu.style.width = `calc(${
        window.innerWidth
      }px - ${this.getScrollbarWidth()}px - 10px)`;
    }

    // لو الشاشة كبيرة نرجع الـ top لو كنا مقيدينه قبل
    if (menu && window.innerWidth >= 769) {
      menu.style.top = '';
      menu.style.position = '';
      menu.style.width = `100%`;
    }

    // debug
    console.log('navHeight =', this.navHeight, 'win =', window.innerWidth);
  }

  ngOnDestroy() {
    if (
      this.resizeObserver &&
      typeof this.resizeObserver.disconnect === 'function'
    ) {
      this.resizeObserver.disconnect();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.menu!.style.left = `5px`;
    } else {
      this.menu!.style.left = `100%`;
    }
  }
}
