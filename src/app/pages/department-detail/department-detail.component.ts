import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from '../../service/header.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {Department} from '../../dataaccess/department';
import {DepartmentService} from '../../service/department.service';
import {BaseComponent} from '../../components/base/base.component';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent extends BaseComponent implements OnInit {

  department = new Department();
  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
  });

  constructor(private router: Router, private headerService: HeaderService, private route: ActivatedRoute,
              private snackBar: MatSnackBar, protected override translate: TranslateService, private formBuilder: UntypedFormBuilder,
              private departmentService: DepartmentService) {
    super(translate);
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.departmentService.getOne(id).subscribe(obj => {
        this.department = obj;
        this.headerService.setPage('nav.vehicle_edit');
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.headerService.setPage('nav.vehicle_new');
      this.objForm = this.formBuilder.group(this.department);
    }
  }

  async back() {
    await this.router.navigate(['departments']);
  }

  async save(formData: any) {
    this.department = Object.assign(formData);

    if (this.department.id) {
      this.departmentService.update(this.department).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.departmentService.save(this.department).subscribe({
        next: () => {
          this.snackBar.open(this.messageNewSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageNewError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }

}
