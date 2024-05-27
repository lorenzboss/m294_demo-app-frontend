import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HeaderService} from '../../service/header.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {Department} from '../../dataaccess/department';
import {DepartmentService} from '../../service/department.service';
import {BaseComponent} from '../../components/base/base.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent extends BaseComponent implements OnInit, AfterViewInit {
  departmentDataSource = new MatTableDataSource<Department>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['name', 'actions'];

  public constructor(private departmentService: DepartmentService, private dialog: MatDialog,
                     private headerService: HeaderService, private router: Router, private snackBar: MatSnackBar,
                     protected override translate: TranslateService) {
    super(translate);
    this.headerService.setPage('nav.departments');
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.departmentDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.departmentService.getList().subscribe(obj => {
      this.departmentDataSource.data = obj;
    });
  }

  async edit(e: Department) {
    await this.router.navigate(['department', e.id]);
  }

  async add() {
    await this.router.navigate(['department']);
  }

  delete(e: Department) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'dialogs.title_delete',
        message: 'dialogs.message_delete'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.departmentService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open(this.deletedMessage, this.closeMessage, {duration: 5000});
              this.reloadData();
            } else {
              this.snackBar.open(this.deleteErrorMessage, this.closeMessage, {duration: 5000});
            }
          },
          error: () => this.snackBar.open(this.deleteErrorMessage, this.closeMessage, {duration: 5000})
        });
      }
    });
  }
}
