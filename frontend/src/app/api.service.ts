
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from './models/product.interface';
import { Router } from '@angular/router';
import { Category } from './models/category.interface';
import { User } from './models/user.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private URL = "http://localhost:5000";
private authState$ = new BehaviorSubject<boolean>(false);
private user:User={
  id:-1,
  firstname: "",
  lastname: "",
  email: "",
  roles: "Reader", 
  username: "",

};
private user$ = new BehaviorSubject<User>(this.user);

  constructor(private http:HttpClient,
              private router:Router) 
   {
      const userJson = localStorage.getItem('user');
  if (userJson) {
    try {
      const user: User = JSON.parse(userJson);
      this.user = user;
      this.user$.next(user);
      this.authState$.next(true);
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
    }
  }

    }

   // Authentication Methods
  isAuthenticated(): boolean {
    return this.authState$.getValue();
  }

  getAuthState(): Observable<boolean> {
    return this.authState$.asObservable();
  }

  getUserObservable(): Observable<User> {
    return this.user$.asObservable();
  }
  createProduct(formData: any): Observable<Product> {
    return this.http.post<Product>(`${this.URL}/product`, formData, {
      withCredentials: true
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/product`);
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }

   getProductById(id:string|null):Observable<Product>{
      return this.http.get<Product>(`${this.URL}/product/${id}`);
    }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.URL}/product/${id}`, product, {
      withCredentials: true
    });
  }

  removeProduct(id: number): Observable<{ success: boolean, product: Product }> {
    return this.http.delete<{ success: boolean, product: Product }>(`${this.URL}/product/${id}`, {
      withCredentials: true
    });
  }

  uploadProductImage(id: string | number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.URL}/product/${id}/upload`, formData, {
    withCredentials: true
  });
}

initializePayment(paymentData: any): Observable<any> {
  return this.http.post(`${this.URL}/payments/initialize`, paymentData);
}
verifyPayment(tx_ref: string): Observable<any> {
  return this.http.get<any>(`${this.URL}/payments/verify/${tx_ref}`);
}


 registerUser(userData: User): Observable<User> {
      return this.http.post<User>(`${this.URL}/user/register`, userData, {
        withCredentials: true
      });
    }

      login(email: string, password: string): Observable<any> {
      return this.http.post<any>(`${this.URL}/user/login`, { email, password }, {
        withCredentials: true
      }).pipe(
        tap((value) => {
          if (value.success) {
            this.authState$.next(true);
            this.user$.next(value.user);
            // this.setUser(value.user);  

          } else {
            this.authState$.next(false);
          }
        })
      );
    }

    
    logout(): Observable<{ success: boolean }> {
      return this.http.post<{ success: boolean }>(`${this.URL}/user/logout`, {}, {
        withCredentials: true
      }).pipe(
        tap(res => {
          if (res.success) {
            this.authState$.next(false);
            this.user$.next({
              email: '',
              id: -1,
              firstname: '',
              lastname: '',
              roles: 'Reader',
              username: '',
            });
            localStorage.removeItem('user');
            // this.router.navigateByUrl('/login');
          }
        })
      );
    }

     setUser(user: User): void {
      localStorage.setItem('user', JSON.stringify(user));
    }
  

}
