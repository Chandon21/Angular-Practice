import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../../shared/models/student.model';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  allStudents: Student[] = [];
  filteredStudents: Student[] = [];
  filter = '';
  page = 1;
  pageSize = 5;
  totalPages = 1;

  constructor(
    private svc: StudentService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filter = params['search'] || '';
      this.page = +params['page'] || 1;
      this.loadStudents();
    });
  }

  loadStudents(): void {
    this.svc.getAll().subscribe(students => {
      this.allStudents = students;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const q = this.filter.trim().toLowerCase();

    if (q) {
      this.filteredStudents = this.allStudents.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          (s.department?.toLowerCase().includes(q) || false) ||
          s.course.toLowerCase().includes(q)
      );
    } else {
      this.filteredStudents = [...this.allStudents];
    }

    this.totalPages = Math.ceil(this.filteredStudents.length / this.pageSize);
    if (this.page > this.totalPages) this.page = this.totalPages || 1;
  }

  get paginatedStudents(): Student[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredStudents.slice(start, start + this.pageSize);
  }

  changePage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
      this.updateQueryParams();
    }
  }

  updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.filter || null, page: this.page },
      queryParamsHandling: 'merge'
    });
  }
// Add this method inside your StudentListComponent class
   onAdd(): void {
  this.router.navigate(['/students/add']);
}

  onEdit(id: number) {
    this.router.navigate(['/students', id, 'edit']);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.svc.deleteStudent(id);
      this.loadStudents();
    }
  }
}
