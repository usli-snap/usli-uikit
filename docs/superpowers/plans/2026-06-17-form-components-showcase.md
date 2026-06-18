# Form Components Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create showcase documentation pages for 6 form components (Input, Textarea, Select, Checkbox, Radio Group, Form Field) with integrated navigation and routing in the showcase app.

**Architecture:** Each form component gets a dedicated docs page (TypeScript component + HTML template + SCSS) placed in `projects/showcase/src/app/pages/components/forms/<component>/`. Pages follow the existing button-docs pattern with specialized sections for form-specific documentation: validation examples, form integration patterns, and error states. Routes are lazy-loaded in `app.routes.ts`. Sidebar navigation is organized into three semantic sections: "Inputs" (Input, Textarea), "Selection" (Select, Checkbox, Radio Group), "Containers" (Form Field).

**Tech Stack:** Angular 21 standalone components, lazy-loaded routes, HTML/SCSS templates.

---

### Task 1: Create Input docs page

**Files:**
- Create: `projects/showcase/src/app/pages/components/forms/input/input-docs.ts`
- Create: `projects/showcase/src/app/pages/components/forms/input/input-docs.html`
- Create: `projects/showcase/src/app/pages/components/forms/input/input-docs.scss`

- [ ] **Step 1: Create TypeScript component**

```typescript
import { Component } from '@angular/core';
import { UsliInputComponent } from 'ui-sdk';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-docs',
  standalone: true,
  imports: [UsliInputComponent, ReactiveFormsModule],
  templateUrl: './input-docs.html',
  styleUrl: './input-docs.scss',
})
export class InputDocs {}
```

- [ ] **Step 2: Create HTML template**

```html
<div class="page">

  <header class="page-header">
    <nav class="breadcrumb">
      <span>Components</span>
      <span class="breadcrumb__sep">/</span>
      <span>Inputs</span>
      <span class="breadcrumb__sep">/</span>
      <span class="breadcrumb__current">Input</span>
    </nav>
    <h1 class="page-title">Input</h1>
    <p class="page-lead">
      Single-line text input field supporting various types (text, email, password, number, etc.).
      Works seamlessly with Angular reactive forms through ControlValueAccessor. Supports
      validation states, disabled mode, and placeholder text.
    </p>
  </header>

  <!-- Validation Examples -->
  <section class="section">
    <h2 class="section__title">Validation Examples</h2>
    <p class="section__desc">
      The Input component integrates with Angular's reactive forms validation. Use FormControl
      with validators to enforce requirements. Validation errors are displayed via the parent
      FormField component.
    </p>

    <h3 class="section__subtitle">Email validation</h3>
    <div class="example-box">
      <usli-input type="email" placeholder="Enter email" />
    </div>
    <div class="code-block">
      <pre><code>&lt;usli-input type="email" placeholder="Enter email" /&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Required field</h3>
    <div class="example-box">
      <usli-input placeholder="Required field" />
    </div>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', Validators.required);

// In template:
&lt;usli-input [formControl]="control" placeholder="Required field" /&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Min/max length</h3>
    <div class="example-box">
      <usli-input placeholder="3-20 characters" />
    </div>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', [
  Validators.minLength(3),
  Validators.maxLength(20)
]);

// In template:
&lt;usli-input [formControl]="control" placeholder="3-20 characters" /&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Form Integration Patterns -->
  <section class="section">
    <h2 class="section__title">Form Integration Patterns</h2>
    <p class="section__desc">
      Input works with reactive forms FormGroup and individual FormControl instances.
      Combine with FormField for full validation error display and label support.
    </p>

    <h3 class="section__subtitle">With FormGroup</h3>
    <div class="code-block">
      <pre><code>// In your component:
form = new FormGroup({
  username: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email])
});

// In template:
&lt;form [formGroup]="form"&gt;
  &lt;usli-form-field label="Username"&gt;
    &lt;usli-input formControlName="username" placeholder="Enter username" /&gt;
  &lt;/usli-form-field&gt;
  &lt;usli-form-field label="Email"&gt;
    &lt;usli-input type="email" formControlName="email" placeholder="Enter email" /&gt;
  &lt;/usli-form-field&gt;
&lt;/form&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Two-way binding alternative</h3>
    <div class="code-block">
      <pre><code>// In your component:
username = signal('');

// In template:
&lt;usli-input [value]="username()" (changed)="username.set($event)" placeholder="Enter username" /&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Error States -->
  <section class="section">
    <h2 class="section__title">Error States</h2>
    <p class="section__desc">
      When used within a FormField, validation errors are automatically displayed below
      the input field. The input itself shows a red border on error.
    </p>

    <h3 class="section__subtitle">Validation error display</h3>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', [Validators.required, Validators.email]);

// User sees error when control is touched and invalid
// Error message: "This field is required" or "Invalid email format"

// In template:
&lt;usli-form-field label="Email"&gt;
  &lt;usli-input type="email" [formControl]="control" placeholder="Enter email" /&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Disabled state</h3>
    <div class="example-box">
      <usli-input placeholder="Disabled input" disabled />
    </div>
    <div class="code-block">
      <pre><code>&lt;usli-input placeholder="Disabled input" disabled /&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- API -->
  <section class="section">
    <h2 class="section__title">API</h2>

    <h3 class="api-subtitle">Inputs</h3>
    <table class="api-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">type</span></td>
          <td><span class="prop-type">string</span></td>
          <td><span class="prop-default">'text'</span></td>
          <td>HTML input type (text, email, password, number, etc.).</td>
        </tr>
        <tr>
          <td><span class="prop-name">placeholder</span></td>
          <td><span class="prop-type">string</span></td>
          <td><span class="prop-default">''</span></td>
          <td>Placeholder text shown when empty.</td>
        </tr>
        <tr>
          <td><span class="prop-name">value</span></td>
          <td><span class="prop-type">string</span></td>
          <td><span class="prop-default">''</span></td>
          <td>Current input value.</td>
        </tr>
        <tr>
          <td><span class="prop-name">disabled</span></td>
          <td><span class="prop-type">boolean</span></td>
          <td><span class="prop-default">false</span></td>
          <td>Disables the input field.</td>
        </tr>
      </tbody>
    </table>

    <h3 class="api-subtitle api-subtitle--spaced">Outputs</h3>
    <table class="api-table">
      <thead>
        <tr><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">changed</span></td>
          <td><span class="prop-type">OutputEmitterRef&lt;string&gt;</span></td>
          <td>Emits the new value on input change.</td>
        </tr>
      </tbody>
    </table>
  </section>

</div>
```

- [ ] **Step 3: Create SCSS file**

```scss
@import '../../../layout/styles/common.scss';
```

- [ ] **Step 4: Verify file structure**

Run: `ls -la projects/showcase/src/app/pages/components/forms/input/`
Expected: input-docs.ts, input-docs.html, input-docs.scss exist

- [ ] **Step 5: Commit**

```bash
git add projects/showcase/src/app/pages/components/forms/input/
git commit -m "feat: add input component showcase documentation"
```

---

### Task 2: Create Textarea docs page

**Files:**
- Create: `projects/showcase/src/app/pages/components/forms/textarea/textarea-docs.ts`
- Create: `projects/showcase/src/app/pages/components/forms/textarea/textarea-docs.html`
- Create: `projects/showcase/src/app/pages/components/forms/textarea/textarea-docs.scss`

- [ ] **Step 1: Create TypeScript component**

```typescript
import { Component } from '@angular/core';
import { UsliTextareaComponent } from 'ui-sdk';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea-docs',
  standalone: true,
  imports: [UsliTextareaComponent, ReactiveFormsModule],
  templateUrl: './textarea-docs.html',
  styleUrl: './textarea-docs.scss',
})
export class TextareaDocs {}
```

- [ ] **Step 2: Create HTML template**

```html
<div class="page">

  <header class="page-header">
    <nav class="breadcrumb">
      <span>Components</span>
      <span class="breadcrumb__sep">/</span>
      <span>Inputs</span>
      <span class="breadcrumb__sep">/</span>
      <span class="breadcrumb__current">Textarea</span>
    </nav>
    <h1 class="page-title">Textarea</h1>
    <p class="page-lead">
      Multi-line text input for longer form content. Integrates with Angular reactive forms
      and supports all standard validation patterns. Auto-resize or fixed height modes available.
    </p>
  </header>

  <!-- Validation Examples -->
  <section class="section">
    <h2 class="section__title">Validation Examples</h2>
    <p class="section__desc">
      Textarea validates just like Input—use FormControl with validators and display errors
      via FormField component.
    </p>

    <h3 class="section__subtitle">Minimum length validation</h3>
    <div class="example-box">
      <usli-textarea placeholder="At least 10 characters required" rows="4"></usli-textarea>
    </div>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', Validators.minLength(10));

// In template:
&lt;usli-textarea [formControl]="control" placeholder="At least 10 characters required" rows="4"&gt;&lt;/usli-textarea&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Required field</h3>
    <div class="example-box">
      <usli-textarea placeholder="Required comment" rows="4"></usli-textarea>
    </div>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', Validators.required);

// In template:
&lt;usli-textarea [formControl]="control" placeholder="Required comment" rows="4"&gt;&lt;/usli-textarea&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Max length validation</h3>
    <div class="example-box">
      <usli-textarea placeholder="Max 500 characters" rows="4"></usli-textarea>
    </div>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', Validators.maxLength(500));

// In template:
&lt;usli-textarea [formControl]="control" placeholder="Max 500 characters" rows="4"&gt;&lt;/usli-textarea&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Form Integration Patterns -->
  <section class="section">
    <h2 class="section__title">Form Integration Patterns</h2>
    <p class="section__desc">
      Textarea works with FormGroup and FormField, supporting the same integration patterns
      as Input component.
    </p>

    <h3 class="section__subtitle">With FormField and FormGroup</h3>
    <div class="code-block">
      <pre><code>// In your component:
form = new FormGroup({
  message: new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(500)
  ])
});

// In template:
&lt;form [formGroup]="form"&gt;
  &lt;usli-form-field label="Your Message"&gt;
    &lt;usli-textarea formControlName="message" 
                     placeholder="Enter your message here..." 
                     rows="6"&gt;&lt;/usli-textarea&gt;
  &lt;/usli-form-field&gt;
&lt;/form&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Dynamic rows based on content</h3>
    <div class="code-block">
      <pre><code>// In your component:
content = signal('');

// In template:
&lt;usli-textarea [value]="content()" 
                (changed)="content.set($event)"
                placeholder="Content grows with text..."
                [rows]="Math.max(4, Math.ceil(content().length / 50))"&gt;&lt;/usli-textarea&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Error States -->
  <section class="section">
    <h2 class="section__title">Error States</h2>
    <p class="section__desc">
      Textarea shows validation errors below when wrapped in FormField. The textarea border
      turns red on error state.
    </p>

    <h3 class="section__subtitle">Validation error with message</h3>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', [
  Validators.required,
  Validators.minLength(10)
]);

// Error messages:
// - "This field is required" (if empty)
// - "Must be at least 10 characters" (if too short)

// In template:
&lt;usli-form-field label="Description"&gt;
  &lt;usli-textarea [formControl]="control" placeholder="Describe your issue..." rows="5"&gt;&lt;/usli-textarea&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Disabled state</h3>
    <div class="example-box">
      <usli-textarea placeholder="Read-only content" rows="4" disabled></usli-textarea>
    </div>
    <div class="code-block">
      <pre><code>&lt;usli-textarea placeholder="Read-only content" rows="4" disabled&gt;&lt;/usli-textarea&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- API -->
  <section class="section">
    <h2 class="section__title">API</h2>

    <h3 class="api-subtitle">Inputs</h3>
    <table class="api-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">placeholder</span></td>
          <td><span class="prop-type">string</span></td>
          <td><span class="prop-default">''</span></td>
          <td>Placeholder text shown when empty.</td>
        </tr>
        <tr>
          <td><span class="prop-name">value</span></td>
          <td><span class="prop-type">string</span></td>
          <td><span class="prop-default">''</span></td>
          <td>Current textarea value.</td>
        </tr>
        <tr>
          <td><span class="prop-name">rows</span></td>
          <td><span class="prop-type">number</span></td>
          <td><span class="prop-default">4</span></td>
          <td>Number of visible text rows.</td>
        </tr>
        <tr>
          <td><span class="prop-name">disabled</span></td>
          <td><span class="prop-type">boolean</span></td>
          <td><span class="prop-default">false</span></td>
          <td>Disables the textarea field.</td>
        </tr>
      </tbody>
    </table>

    <h3 class="api-subtitle api-subtitle--spaced">Outputs</h3>
    <table class="api-table">
      <thead>
        <tr><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">changed</span></td>
          <td><span class="prop-type">OutputEmitterRef&lt;string&gt;</span></td>
          <td>Emits the new value on input change.</td>
        </tr>
      </tbody>
    </table>
  </section>

</div>
```

- [ ] **Step 3: Create SCSS file**

```scss
@import '../../../layout/styles/common.scss';
```

- [ ] **Step 4: Verify file structure**

Run: `ls -la projects/showcase/src/app/pages/components/forms/textarea/`
Expected: textarea-docs.ts, textarea-docs.html, textarea-docs.scss exist

- [ ] **Step 5: Commit**

```bash
git add projects/showcase/src/app/pages/components/forms/textarea/
git commit -m "feat: add textarea component showcase documentation"
```

---

### Task 3: Create Select docs page

**Files:**
- Create: `projects/showcase/src/app/pages/components/forms/select/select-docs.ts`
- Create: `projects/showcase/src/app/pages/components/forms/select/select-docs.html`
- Create: `projects/showcase/src/app/pages/components/forms/select/select-docs.scss`

- [ ] **Step 1: Create TypeScript component**

```typescript
import { Component } from '@angular/core';
import { UsliSelectComponent } from 'ui-sdk';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-docs',
  standalone: true,
  imports: [UsliSelectComponent, ReactiveFormsModule],
  templateUrl: './select-docs.html',
  styleUrl: './select-docs.scss',
})
export class SelectDocs {}
```

- [ ] **Step 2: Create HTML template**

```html
<div class="page">

  <header class="page-header">
    <nav class="breadcrumb">
      <span>Components</span>
      <span class="breadcrumb__sep">/</span>
      <span>Selection</span>
      <span class="breadcrumb__sep">/</span>
      <span class="breadcrumb__current">Select</span>
    </nav>
    <h1 class="page-title">Select</h1>
    <p class="page-lead">
      Dropdown select component for choosing from predefined options. Supports single and
      multiple selection modes, optgroups, and full reactive forms integration. Works with
      ControlValueAccessor for seamless FormControl binding.
    </p>
  </header>

  <!-- Validation Examples -->
  <section class="section">
    <h2 class="section__title">Validation Examples</h2>
    <p class="section__desc">
      Select fields validate like other form controls. Display validation errors via
      FormField component. Required validation ensures a selection is made.
    </p>

    <h3 class="section__subtitle">Required selection</h3>
    <div class="example-box">
      <usli-select>
        <option value="">-- Select an option --</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </usli-select>
    </div>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', Validators.required);

// In template:
&lt;usli-select [formControl]="control"&gt;
  &lt;option value=""&gt;-- Select an option --&lt;/option&gt;
  &lt;option value="option1"&gt;Option 1&lt;/option&gt;
  &lt;option value="option2"&gt;Option 2&lt;/option&gt;
  &lt;option value="option3"&gt;Option 3&lt;/option&gt;
&lt;/usli-select&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">With optgroup</h3>
    <div class="example-box">
      <usli-select>
        <optgroup label="Fruit">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </optgroup>
        <optgroup label="Vegetables">
          <option value="carrot">Carrot</option>
          <option value="broccoli">Broccoli</option>
        </optgroup>
      </usli-select>
    </div>
    <div class="code-block">
      <pre><code>&lt;usli-select&gt;
  &lt;optgroup label="Fruit"&gt;
    &lt;option value="apple"&gt;Apple&lt;/option&gt;
    &lt;option value="banana"&gt;Banana&lt;/option&gt;
  &lt;/optgroup&gt;
  &lt;optgroup label="Vegetables"&gt;
    &lt;option value="carrot"&gt;Carrot&lt;/option&gt;
    &lt;option value="broccoli"&gt;Broccoli&lt;/option&gt;
  &lt;/optgroup&gt;
&lt;/usli-select&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Form Integration Patterns -->
  <section class="section">
    <h2 class="section__title">Form Integration Patterns</h2>
    <p class="section__desc">
      Select works with FormGroup and FormField. Supports single-select (default) and
      multiple selection modes.
    </p>

    <h3 class="section__subtitle">Single select with FormGroup</h3>
    <div class="code-block">
      <pre><code>// In your component:
form = new FormGroup({
  category: new FormControl('', Validators.required),
  priority: new FormControl('medium')
});

// In template:
&lt;form [formGroup]="form"&gt;
  &lt;usli-form-field label="Category"&gt;
    &lt;usli-select formControlName="category"&gt;
      &lt;option value=""&gt;-- Select category --&lt;/option&gt;
      &lt;option value="bug"&gt;Bug&lt;/option&gt;
      &lt;option value="feature"&gt;Feature Request&lt;/option&gt;
      &lt;option value="docs"&gt;Documentation&lt;/option&gt;
    &lt;/usli-select&gt;
  &lt;/usli-form-field&gt;

  &lt;usli-form-field label="Priority"&gt;
    &lt;usli-select formControlName="priority"&gt;
      &lt;option value="low"&gt;Low&lt;/option&gt;
      &lt;option value="medium"&gt;Medium&lt;/option&gt;
      &lt;option value="high"&gt;High&lt;/option&gt;
    &lt;/usli-select&gt;
  &lt;/usli-form-field&gt;
&lt;/form&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Multiple selection</h3>
    <div class="code-block">
      <pre><code>// In your component:
form = new FormGroup({
  tags: new FormControl([], Validators.required)
});

// In template:
&lt;usli-form-field label="Tags"&gt;
  &lt;usli-select formControlName="tags" multiple&gt;
    &lt;option value="javascript"&gt;JavaScript&lt;/option&gt;
    &lt;option value="typescript"&gt;TypeScript&lt;/option&gt;
    &lt;option value="angular"&gt;Angular&lt;/option&gt;
    &lt;option value="react"&gt;React&lt;/option&gt;
  &lt;/usli-select&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Error States -->
  <section class="section">
    <h2 class="section__title">Error States</h2>
    <p class="section__desc">
      Select displays validation errors below when wrapped in FormField. The select border
      turns red on error state.
    </p>

    <h3 class="section__subtitle">Required field error</h3>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', Validators.required);

// User sees error: "This field is required"
// when select is touched and no option selected

// In template:
&lt;usli-form-field label="Choose Option"&gt;
  &lt;usli-select [formControl]="control"&gt;
    &lt;option value=""&gt;-- Select an option --&lt;/option&gt;
    &lt;option value="opt1"&gt;Option 1&lt;/option&gt;
  &lt;/usli-select&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Disabled state</h3>
    <div class="example-box">
      <usli-select disabled>
        <option value="">-- Select an option --</option>
        <option value="option1">Option 1</option>
      </usli-select>
    </div>
    <div class="code-block">
      <pre><code>&lt;usli-select disabled&gt;
  &lt;option value=""&gt;-- Select an option --&lt;/option&gt;
  &lt;option value="option1"&gt;Option 1&lt;/option&gt;
&lt;/usli-select&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- API -->
  <section class="section">
    <h2 class="section__title">API</h2>

    <h3 class="api-subtitle">Inputs</h3>
    <table class="api-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">value</span></td>
          <td><span class="prop-type">string | string[]</span></td>
          <td><span class="prop-default">''</span></td>
          <td>Selected option value(s). Array for multiple mode.</td>
        </tr>
        <tr>
          <td><span class="prop-name">multiple</span></td>
          <td><span class="prop-type">boolean</span></td>
          <td><span class="prop-default">false</span></td>
          <td>Enables multiple selection mode.</td>
        </tr>
        <tr>
          <td><span class="prop-name">disabled</span></td>
          <td><span class="prop-type">boolean</span></td>
          <td><span class="prop-default">false</span></td>
          <td>Disables the select field.</td>
        </tr>
      </tbody>
    </table>

    <h3 class="api-subtitle api-subtitle--spaced">Outputs</h3>
    <table class="api-table">
      <thead>
        <tr><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">changed</span></td>
          <td><span class="prop-type">OutputEmitterRef&lt;string | string[]&gt;</span></td>
          <td>Emits the new selected value(s) on change.</td>
        </tr>
      </tbody>
    </table>
  </section>

</div>
```

- [ ] **Step 3: Create SCSS file**

```scss
@import '../../../layout/styles/common.scss';
```

- [ ] **Step 4: Verify file structure**

Run: `ls -la projects/showcase/src/app/pages/components/forms/select/`
Expected: select-docs.ts, select-docs.html, select-docs.scss exist

- [ ] **Step 5: Commit**

```bash
git add projects/showcase/src/app/pages/components/forms/select/
git commit -m "feat: add select component showcase documentation"
```

---

### Task 4: Create Checkbox docs page

**Files:**
- Create: `projects/showcase/src/app/pages/components/forms/checkbox/checkbox-docs.ts`
- Create: `projects/showcase/src/app/pages/components/forms/checkbox/checkbox-docs.html`
- Create: `projects/showcase/src/app/pages/components/forms/checkbox/checkbox-docs.scss`

- [ ] **Step 1: Create TypeScript component**

```typescript
import { Component } from '@angular/core';
import { UsliCheckboxComponent } from 'ui-sdk';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox-docs',
  standalone: true,
  imports: [UsliCheckboxComponent, ReactiveFormsModule],
  templateUrl: './checkbox-docs.html',
  styleUrl: './checkbox-docs.scss',
})
export class CheckboxDocs {}
```

- [ ] **Step 2: Create HTML template**

```html
<div class="page">

  <header class="page-header">
    <nav class="breadcrumb">
      <span>Components</span>
      <span class="breadcrumb__sep">/</span>
      <span>Selection</span>
      <span class="breadcrumb__sep">/</span>
      <span class="breadcrumb__current">Checkbox</span>
    </nav>
    <h1 class="page-title">Checkbox</h1>
    <p class="page-lead">
      Single checkbox or group of checkboxes for binary or multi-select options. Full reactive
      forms support with ControlValueAccessor integration. Supports disabled and indeterminate
      states.
    </p>
  </header>

  <!-- Validation Examples -->
  <section class="section">
    <h2 class="section__title">Validation Examples</h2>
    <p class="section__desc">
      Checkboxes validate through FormControl. Use requiredTrue to enforce checking a single
      box, or track multiple selections in an array.
    </p>

    <h3 class="section__subtitle">Single required checkbox</h3>
    <div class="example-box">
      <usli-checkbox label="I agree to terms and conditions"></usli-checkbox>
    </div>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl(false, Validators.requiredTrue);

// In template:
&lt;usli-checkbox label="I agree to terms and conditions" [formControl]="control"&gt;&lt;/usli-checkbox&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Checkbox group with validation</h3>
    <div class="example-box">
      <usli-checkbox label="JavaScript"></usli-checkbox>
      <usli-checkbox label="TypeScript"></usli-checkbox>
      <usli-checkbox label="Python"></usli-checkbox>
    </div>
    <div class="code-block">
      <pre><code>// In your component:
languages = new FormArray([
  new FormControl(false),
  new FormControl(false),
  new FormControl(false)
], this.atLeastOneChecked);

private atLeastOneChecked(group: FormArray): ValidationErrors | null {
  return group.value.some((v: boolean) => v) ? null : { atLeastOne: true };
}

// In template:
&lt;fieldset&gt;
  &lt;usli-checkbox label="JavaScript" [formControl]="languages.at(0)"&gt;&lt;/usli-checkbox&gt;
  &lt;usli-checkbox label="TypeScript" [formControl]="languages.at(1)"&gt;&lt;/usli-checkbox&gt;
  &lt;usli-checkbox label="Python" [formControl]="languages.at(2)"&gt;&lt;/usli-checkbox&gt;
&lt;/fieldset&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Form Integration Patterns -->
  <section class="section">
    <h2 class="section__title">Form Integration Patterns</h2>
    <p class="section__desc">
      Use individual FormControl for single checkboxes or FormArray for checkbox groups.
      Each checkbox binds to its own FormControl within the group.
    </p>

    <h3 class="section__subtitle">Single checkbox in FormGroup</h3>
    <div class="code-block">
      <pre><code>// In your component:
form = new FormGroup({
  newsletter: new FormControl(false),
  notifications: new FormControl(true)
});

// In template:
&lt;form [formGroup]="form"&gt;
  &lt;usli-checkbox formControlName="newsletter" label="Subscribe to newsletter"&gt;&lt;/usli-checkbox&gt;
  &lt;usli-checkbox formControlName="notifications" label="Enable notifications"&gt;&lt;/usli-checkbox&gt;
&lt;/form&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Checkbox group with FormArray</h3>
    <div class="code-block">
      <pre><code>// In your component:
form = new FormGroup({
  interests: new FormArray([
    new FormControl(false),
    new FormControl(false),
    new FormControl(false)
  ])
});

// In template:
&lt;form [formGroup]="form"&gt;
  &lt;fieldset [formArrayName]="'interests'"&gt;
    &lt;legend&gt;Interests&lt;/legend&gt;
    @for (let item of interestLabels; track $index) {
      &lt;usli-checkbox [formControl]="form.get('interests')!.get($index.toString())"
                     [label]="item"&gt;&lt;/usli-checkbox&gt;
    }
  &lt;/fieldset&gt;
&lt;/form&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Error States -->
  <section class="section">
    <h2 class="section__title">Error States</h2>
    <p class="section__desc">
      Checkboxes show validation errors when wrapped in FormField. The checkbox label
      turns red on error state. Use requiredTrue for enforcing single checkbox selection.
    </p>

    <h3 class="section__subtitle">Required checkbox error</h3>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl(false, Validators.requiredTrue);

// Error: "This field is required" when unchecked

// In template:
&lt;usli-form-field&gt;
  &lt;usli-checkbox [formControl]="control" label="I agree to the terms"&gt;&lt;/usli-checkbox&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Disabled state</h3>
    <div class="example-box">
      <usli-checkbox label="Disabled unchecked" disabled></usli-checkbox>
      <usli-checkbox label="Disabled checked" checked disabled></usli-checkbox>
    </div>
    <div class="code-block">
      <pre><code>&lt;usli-checkbox label="Disabled unchecked" disabled&gt;&lt;/usli-checkbox&gt;
&lt;usli-checkbox label="Disabled checked" checked disabled&gt;&lt;/usli-checkbox&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- API -->
  <section class="section">
    <h2 class="section__title">API</h2>

    <h3 class="api-subtitle">Inputs</h3>
    <table class="api-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">label</span></td>
          <td><span class="prop-type">string</span></td>
          <td><span class="prop-default">''</span></td>
          <td>Checkbox label text.</td>
        </tr>
        <tr>
          <td><span class="prop-name">checked</span></td>
          <td><span class="prop-type">boolean</span></td>
          <td><span class="prop-default">false</span></td>
          <td>Whether checkbox is checked.</td>
        </tr>
        <tr>
          <td><span class="prop-name">disabled</span></td>
          <td><span class="prop-type">boolean</span></td>
          <td><span class="prop-default">false</span></td>
          <td>Disables the checkbox.</td>
        </tr>
        <tr>
          <td><span class="prop-name">value</span></td>
          <td><span class="prop-type">any</span></td>
          <td><span class="prop-default">true</span></td>
          <td>Value emitted when checked (for checkbox groups).</td>
        </tr>
      </tbody>
    </table>

    <h3 class="api-subtitle api-subtitle--spaced">Outputs</h3>
    <table class="api-table">
      <thead>
        <tr><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">changed</span></td>
          <td><span class="prop-type">OutputEmitterRef&lt;boolean&gt;</span></td>
          <td>Emits the new checked state on change.</td>
        </tr>
      </tbody>
    </table>
  </section>

</div>
```

- [ ] **Step 3: Create SCSS file**

```scss
@import '../../../layout/styles/common.scss';
```

- [ ] **Step 4: Verify file structure**

Run: `ls -la projects/showcase/src/app/pages/components/forms/checkbox/`
Expected: checkbox-docs.ts, checkbox-docs.html, checkbox-docs.scss exist

- [ ] **Step 5: Commit**

```bash
git add projects/showcase/src/app/pages/components/forms/checkbox/
git commit -m "feat: add checkbox component showcase documentation"
```

---

### Task 5: Create Radio Group docs page

**Files:**
- Create: `projects/showcase/src/app/pages/components/forms/radio-group/radio-group-docs.ts`
- Create: `projects/showcase/src/app/pages/components/forms/radio-group/radio-group-docs.html`
- Create: `projects/showcase/src/app/pages/components/forms/radio-group/radio-group-docs.scss`

- [ ] **Step 1: Create TypeScript component**

```typescript
import { Component } from '@angular/core';
import { UsliRadioGroupComponent } from 'ui-sdk';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-group-docs',
  standalone: true,
  imports: [UsliRadioGroupComponent, ReactiveFormsModule],
  templateUrl: './radio-group-docs.html',
  styleUrl: './radio-group-docs.scss',
})
export class RadioGroupDocs {}
```

- [ ] **Step 2: Create HTML template**

```html
<div class="page">

  <header class="page-header">
    <nav class="breadcrumb">
      <span>Components</span>
      <span class="breadcrumb__sep">/</span>
      <span>Selection</span>
      <span class="breadcrumb__sep">/</span>
      <span class="breadcrumb__current">Radio Group</span>
    </nav>
    <h1 class="page-title">Radio Group</h1>
    <p class="page-lead">
      Group of radio buttons for single-option selection. Enforces exclusive selection
      (only one option can be selected at a time). Full reactive forms integration with
      ControlValueAccessor pattern.
    </p>
  </header>

  <!-- Validation Examples -->
  <section class="section">
    <h2 class="section__title">Validation Examples</h2>
    <p class="section__desc">
      Radio groups validate like other form controls. Required validation ensures a
      selection is made from the group.
    </p>

    <h3 class="section__subtitle">Required selection</h3>
    <div class="example-box">
      <usli-radio-group name="difficulty">
        <label>
          <input type="radio" name="difficulty" value="easy" />
          Easy
        </label>
        <label>
          <input type="radio" name="difficulty" value="medium" />
          Medium
        </label>
        <label>
          <input type="radio" name="difficulty" value="hard" />
          Hard
        </label>
      </usli-radio-group>
    </div>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', Validators.required);

// In template:
&lt;usli-radio-group [formControl]="control" name="difficulty"&gt;
  &lt;label&gt;
    &lt;input type="radio" value="easy" /&gt;
    Easy
  &lt;/label&gt;
  &lt;label&gt;
    &lt;input type="radio" value="medium" /&gt;
    Medium
  &lt;/label&gt;
  &lt;label&gt;
    &lt;input type="radio" value="hard" /&gt;
    Hard
  &lt;/label&gt;
&lt;/usli-radio-group&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">With default selection</h3>
    <div class="example-box">
      <usli-radio-group name="theme">
        <label>
          <input type="radio" name="theme" value="light" />
          Light
        </label>
        <label>
          <input type="radio" name="theme" value="dark" checked />
          Dark
        </label>
      </usli-radio-group>
    </div>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('dark', Validators.required);

// In template:
&lt;usli-radio-group [formControl]="control" name="theme"&gt;
  &lt;label&gt;
    &lt;input type="radio" value="light" /&gt;
    Light
  &lt;/label&gt;
  &lt;label&gt;
    &lt;input type="radio" value="dark" /&gt;
    Dark
  &lt;/label&gt;
&lt;/usli-radio-group&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Form Integration Patterns -->
  <section class="section">
    <h2 class="section__title">Form Integration Patterns</h2>
    <p class="section__desc">
      Radio groups integrate with FormControl for single-option selection. The value
      of the selected radio button is bound to the FormControl value.
    </p>

    <h3 class="section__subtitle">With FormGroup and default value</h3>
    <div class="code-block">
      <pre><code>// In your component:
form = new FormGroup({
  frequency: new FormControl('weekly', Validators.required),
  format: new FormControl('email', Validators.required)
});

// In template:
&lt;form [formGroup]="form"&gt;
  &lt;usli-form-field label="Email Frequency"&gt;
    &lt;usli-radio-group formControlName="frequency" name="frequency"&gt;
      &lt;label&gt;
        &lt;input type="radio" value="daily" /&gt;
        Daily
      &lt;/label&gt;
      &lt;label&gt;
        &lt;input type="radio" value="weekly" /&gt;
        Weekly
      &lt;/label&gt;
      &lt;label&gt;
        &lt;input type="radio" value="monthly" /&gt;
        Monthly
      &lt;/label&gt;
    &lt;/usli-radio-group&gt;
  &lt;/usli-form-field&gt;

  &lt;usli-form-field label="Format"&gt;
    &lt;usli-radio-group formControlName="format" name="format"&gt;
      &lt;label&gt;
        &lt;input type="radio" value="email" /&gt;
        Email
      &lt;/label&gt;
      &lt;label&gt;
        &lt;input type="radio" value="sms" /&gt;
        SMS
      &lt;/label&gt;
    &lt;/usli-radio-group&gt;
  &lt;/usli-form-field&gt;
&lt;/form&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Dynamic options from signal</h3>
    <div class="code-block">
      <pre><code>// In your component:
options = signal([
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' }
]);
selected = signal('opt1');

// In template:
&lt;usli-radio-group [value]="selected()" 
                   (changed)="selected.set($event)"
                   name="options"&gt;
  @for (let opt of options(); track opt.value) {
    &lt;label&gt;
      &lt;input type="radio" [value]="opt.value" /&gt;
      {{ opt.label }}
    &lt;/label&gt;
  }
&lt;/usli-radio-group&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Error States -->
  <section class="section">
    <h2 class="section__title">Error States</h2>
    <p class="section__desc">
      Radio groups display validation errors below when wrapped in FormField. The group
      border turns red on error state.
    </p>

    <h3 class="section__subtitle">Required field error</h3>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', Validators.required);

// Error: "This field is required" when no radio selected

// In template:
&lt;usli-form-field label="Choose Option"&gt;
  &lt;usli-radio-group [formControl]="control" name="options"&gt;
    &lt;label&gt;
      &lt;input type="radio" value="opt1" /&gt;
      Option 1
    &lt;/label&gt;
    &lt;label&gt;
      &lt;input type="radio" value="opt2" /&gt;
      Option 2
    &lt;/label&gt;
  &lt;/usli-radio-group&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Disabled state</h3>
    <div class="example-box">
      <usli-radio-group name="disabled_example" disabled>
        <label>
          <input type="radio" name="disabled_example" value="opt1" />
          Option 1 (disabled)
        </label>
        <label>
          <input type="radio" name="disabled_example" value="opt2" checked />
          Option 2 (disabled)
        </label>
      </usli-radio-group>
    </div>
    <div class="code-block">
      <pre><code>&lt;usli-radio-group name="example" disabled&gt;
  &lt;label&gt;
    &lt;input type="radio" value="opt1" /&gt;
    Option 1
  &lt;/label&gt;
  &lt;label&gt;
    &lt;input type="radio" value="opt2" /&gt;
    Option 2
  &lt;/label&gt;
&lt;/usli-radio-group&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- API -->
  <section class="section">
    <h2 class="section__title">API</h2>

    <h3 class="api-subtitle">Inputs</h3>
    <table class="api-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">name</span></td>
          <td><span class="prop-type">string</span></td>
          <td><span class="prop-default">''</span></td>
          <td>Name attribute for radio inputs (groups them).</td>
        </tr>
        <tr>
          <td><span class="prop-name">value</span></td>
          <td><span class="prop-type">any</span></td>
          <td><span class="prop-default">''</span></td>
          <td>Currently selected radio button value.</td>
        </tr>
        <tr>
          <td><span class="prop-name">disabled</span></td>
          <td><span class="prop-type">boolean</span></td>
          <td><span class="prop-default">false</span></td>
          <td>Disables all radio buttons in the group.</td>
        </tr>
      </tbody>
    </table>

    <h3 class="api-subtitle api-subtitle--spaced">Outputs</h3>
    <table class="api-table">
      <thead>
        <tr><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">changed</span></td>
          <td><span class="prop-type">OutputEmitterRef&lt;any&gt;</span></td>
          <td>Emits the selected radio button value on change.</td>
        </tr>
      </tbody>
    </table>
  </section>

</div>
```

- [ ] **Step 3: Create SCSS file**

```scss
@import '../../../layout/styles/common.scss';
```

- [ ] **Step 4: Verify file structure**

Run: `ls -la projects/showcase/src/app/pages/components/forms/radio-group/`
Expected: radio-group-docs.ts, radio-group-docs.html, radio-group-docs.scss exist

- [ ] **Step 5: Commit**

```bash
git add projects/showcase/src/app/pages/components/forms/radio-group/
git commit -m "feat: add radio-group component showcase documentation"
```

---

### Task 6: Create Form Field docs page

**Files:**
- Create: `projects/showcase/src/app/pages/components/forms/form-field/form-field-docs.ts`
- Create: `projects/showcase/src/app/pages/components/forms/form-field/form-field-docs.html`
- Create: `projects/showcase/src/app/pages/components/forms/form-field/form-field-docs.scss`

- [ ] **Step 1: Create TypeScript component**

```typescript
import { Component } from '@angular/core';
import { UsliFormFieldComponent } from 'ui-sdk';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-field-docs',
  standalone: true,
  imports: [UsliFormFieldComponent, ReactiveFormsModule],
  templateUrl: './form-field-docs.html',
  styleUrl: './form-field-docs.scss',
})
export class FormFieldDocs {}
```

- [ ] **Step 2: Create HTML template**

```html
<div class="page">

  <header class="page-header">
    <nav class="breadcrumb">
      <span>Components</span>
      <span class="breadcrumb__sep">/</span>
      <span>Containers</span>
      <span class="breadcrumb__sep">/</span>
      <span class="breadcrumb__current">Form Field</span>
    </nav>
    <h1 class="page-title">Form Field</h1>
    <p class="page-lead">
      Container component for form inputs. Wraps Input, Textarea, Select, Checkbox, or
      Radio Group components and automatically displays labels and validation error messages.
      Integrates seamlessly with reactive forms for a complete form experience.
    </p>
  </header>

  <!-- Validation Examples -->
  <section class="section">
    <h2 class="section__title">Validation Examples</h2>
    <p class="section__desc">
      FormField automatically displays validation errors from the wrapped form control.
      Errors appear below the control in red text. Multiple error types can be handled
      with custom error messages.
    </p>

    <h3 class="section__subtitle">Email validation with error</h3>
    <div class="example-box">
      <usli-form-field label="Email Address">
        <input type="email" placeholder="you@example.com" />
      </usli-form-field>
    </div>
    <div class="code-block">
      <pre><code>// In your component:
emailControl = new FormControl('', [
  Validators.required,
  Validators.email
]);

// In template:
&lt;usli-form-field label="Email Address"&gt;
  &lt;input type="email" [formControl]="emailControl" placeholder="you@example.com" /&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Min/max length validation</h3>
    <div class="code-block">
      <pre><code>// In your component:
passwordControl = new FormControl('', [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(128)
]);

// Possible errors:
// - "This field is required" (if empty)
// - "Must be at least 8 characters" (if too short)
// - "Must not exceed 128 characters" (if too long)

// In template:
&lt;usli-form-field label="Password"&gt;
  &lt;input type="password" [formControl]="passwordControl" placeholder="••••••••" /&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Form Integration Patterns -->
  <section class="section">
    <h2 class="section__title">Form Integration Patterns</h2>
    <p class="section__desc">
      FormField is a container that works with any form control inside (Input, Textarea,
      Select, Checkbox, Radio Group). It automatically handles label display and error
      message rendering based on the control's validation state.
    </p>

    <h3 class="section__subtitle">Complete form example</h3>
    <div class="code-block">
      <pre><code>// In your component:
form = new FormGroup({
  username: new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]),
  email: new FormControl('', [
    Validators.required,
    Validators.email
  ]),
  bio: new FormControl(''),
  agreeToTerms: new FormControl(false, Validators.requiredTrue)
});

// In template:
&lt;form [formGroup]="form"&gt;
  &lt;usli-form-field label="Username"&gt;
    &lt;usli-input formControlName="username" placeholder="Enter username" /&gt;
  &lt;/usli-form-field&gt;

  &lt;usli-form-field label="Email"&gt;
    &lt;usli-input type="email" formControlName="email" placeholder="your@email.com" /&gt;
  &lt;/usli-form-field&gt;

  &lt;usli-form-field label="Bio"&gt;
    &lt;usli-textarea formControlName="bio" placeholder="Tell us about yourself..." rows="4"&gt;&lt;/usli-textarea&gt;
  &lt;/usli-form-field&gt;

  &lt;usli-form-field&gt;
    &lt;usli-checkbox formControlName="agreeToTerms" label="I agree to the terms and conditions"&gt;&lt;/usli-checkbox&gt;
  &lt;/usli-form-field&gt;

  &lt;button type="submit" [disabled]="form.invalid"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">With select dropdown</h3>
    <div class="code-block">
      <pre><code>// In your component:
form = new FormGroup({
  category: new FormControl('', Validators.required),
  priority: new FormControl('medium')
});

// In template:
&lt;usli-form-field label="Category"&gt;
  &lt;usli-select formControlName="category"&gt;
    &lt;option value=""&gt;-- Select category --&lt;/option&gt;
    &lt;option value="bug"&gt;Bug Report&lt;/option&gt;
    &lt;option value="feature"&gt;Feature Request&lt;/option&gt;
    &lt;option value="docs"&gt;Documentation&lt;/option&gt;
  &lt;/usli-select&gt;
&lt;/usli-form-field&gt;

&lt;usli-form-field label="Priority"&gt;
  &lt;usli-select formControlName="priority"&gt;
    &lt;option value="low"&gt;Low&lt;/option&gt;
    &lt;option value="medium"&gt;Medium&lt;/option&gt;
    &lt;option value="high"&gt;High&lt;/option&gt;
  &lt;/usli-select&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- Error States -->
  <section class="section">
    <h2 class="section__title">Error States</h2>
    <p class="section__desc">
      FormField displays validation errors automatically when the wrapped control is
      invalid and touched. Multiple error types are displayed with specific messages.
    </p>

    <h3 class="section__subtitle">Required field error</h3>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', Validators.required);

// FormField shows: "This field is required"
// when control is touched and empty

// In template:
&lt;usli-form-field label="Name"&gt;
  &lt;usli-input [formControl]="control" placeholder="Enter your name" /&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">Multiple error types</h3>
    <div class="code-block">
      <pre><code>// In your component:
control = new FormControl('', [
  Validators.required,
  Validators.email,
  Validators.minLength(5)
]);

// Error messages shown (in order):
// 1. "This field is required" (if empty)
// 2. "Invalid email format" (if not valid email)
// 3. "Must be at least 5 characters" (if too short)

// In template:
&lt;usli-form-field label="Email"&gt;
  &lt;usli-input type="email" [formControl]="control" placeholder="user@example.com" /&gt;
&lt;/usli-form-field&gt;</code></pre>
    </div>

    <h3 class="section__subtitle section__subtitle--spaced">No error when valid</h3>
    <div class="code-block">
      <pre><code>// When the wrapped control is valid, FormField shows no error
// and the control displays normally with the label

// In template:
&lt;usli-form-field label="Username"&gt;
  &lt;usli-input [formControl]="validControl" placeholder="Enter username" /&gt;
&lt;/usli-form-field&gt;

// If validControl is valid: no error shown, control displays normally
// If validControl is invalid and touched: error message shown in red</code></pre>
    </div>
  </section>

  <hr class="divider" />

  <!-- API -->
  <section class="section">
    <h2 class="section__title">API</h2>

    <h3 class="api-subtitle">Inputs</h3>
    <table class="api-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">label</span></td>
          <td><span class="prop-type">string</span></td>
          <td><span class="prop-default">''</span></td>
          <td>Label text shown above the form control.</td>
        </tr>
        <tr>
          <td><span class="prop-name">required</span></td>
          <td><span class="prop-type">boolean</span></td>
          <td><span class="prop-default">false</span></td>
          <td>Shows asterisk (*) on label if true.</td>
        </tr>
        <tr>
          <td><span class="prop-name">disabled</span></td>
          <td><span class="prop-type">boolean</span></td>
          <td><span class="prop-default">false</span></td>
          <td>Disables the wrapped form control.</td>
        </tr>
      </tbody>
    </table>

    <h3 class="api-subtitle api-subtitle--spaced">Projected Content</h3>
    <table class="api-table">
      <thead>
        <tr><th>Selector</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="prop-name">default</span></td>
          <td><span class="prop-type">ng-content</span></td>
          <td>Accepts form control component(s) (usli-input, usli-textarea, usli-select, usli-checkbox, usli-radio-group).</td>
        </tr>
      </tbody>
    </table>
  </section>

</div>
```

- [ ] **Step 3: Create SCSS file**

```scss
@import '../../../layout/styles/common.scss';
```

- [ ] **Step 4: Verify file structure**

Run: `ls -la projects/showcase/src/app/pages/components/forms/form-field/`
Expected: form-field-docs.ts, form-field-docs.html, form-field-docs.scss exist

- [ ] **Step 5: Commit**

```bash
git add projects/showcase/src/app/pages/components/forms/form-field/
git commit -m "feat: add form-field component showcase documentation"
```

---

### Task 7: Update app routes

**Files:**
- Modify: `projects/showcase/src/app/app.routes.ts`

- [ ] **Step 1: Read current routes file**

Run: `cat projects/showcase/src/app/app.routes.ts`

- [ ] **Step 2: Add 6 new routes**

Add these routes after the spinner route (before the catch-all):

```typescript
  {
    path: 'components/input',
    loadComponent: () => import('./pages/components/forms/input/input-docs').then(m => m.InputDocs),
  },
  {
    path: 'components/textarea',
    loadComponent: () => import('./pages/components/forms/textarea/textarea-docs').then(m => m.TextareaDocs),
  },
  {
    path: 'components/select',
    loadComponent: () => import('./pages/components/forms/select/select-docs').then(m => m.SelectDocs),
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./pages/components/forms/checkbox/checkbox-docs').then(m => m.CheckboxDocs),
  },
  {
    path: 'components/radio-group',
    loadComponent: () => import('./pages/components/forms/radio-group/radio-group-docs').then(m => m.RadioGroupDocs),
  },
  {
    path: 'components/form-field',
    loadComponent: () => import('./pages/components/forms/form-field/form-field-docs').then(m => m.FormFieldDocs),
  },
```

**Result:** The complete file should be:

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'components/button',
    loadComponent: () => import('./pages/components/button/button-docs').then(m => m.ButtonDocs),
  },
  {
    path: 'components/badge',
    loadComponent: () => import('./pages/components/badge/badge-docs').then(m => m.BadgeDocs),
  },
  {
    path: 'components/alert',
    loadComponent: () => import('./pages/components/alert/alert-docs').then(m => m.AlertDocs),
  },
  {
    path: 'components/card',
    loadComponent: () => import('./pages/components/card/card-docs').then(m => m.CardDocs),
  },
  {
    path: 'components/spinner',
    loadComponent: () => import('./pages/components/spinner/spinner-docs').then(m => m.SpinnerDocs),
  },
  {
    path: 'components/input',
    loadComponent: () => import('./pages/components/forms/input/input-docs').then(m => m.InputDocs),
  },
  {
    path: 'components/textarea',
    loadComponent: () => import('./pages/components/forms/textarea/textarea-docs').then(m => m.TextareaDocs),
  },
  {
    path: 'components/select',
    loadComponent: () => import('./pages/components/forms/select/select-docs').then(m => m.SelectDocs),
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./pages/components/forms/checkbox/checkbox-docs').then(m => m.CheckboxDocs),
  },
  {
    path: 'components/radio-group',
    loadComponent: () => import('./pages/components/forms/radio-group/radio-group-docs').then(m => m.RadioGroupDocs),
  },
  {
    path: 'components/form-field',
    loadComponent: () => import('./pages/components/forms/form-field/form-field-docs').then(m => m.FormFieldDocs),
  },
  {
    path: 'design/colors',
    loadComponent: () => import('./pages/design/colors/colors-docs').then(m => m.ColorsDocs),
  },
  {
    path: 'design/typography',
    loadComponent: () => import('./pages/design/typography/typography-docs').then(m => m.TypographyDocs),
  },
  { path: '**', redirectTo: '' },
];
```

- [ ] **Step 3: Verify routes syntax**

Run: `cd projects/showcase && npm run build 2>&1 | head -20`
Expected: No TypeScript errors about app.routes.ts

- [ ] **Step 4: Commit**

```bash
git add projects/showcase/src/app/app.routes.ts
git commit -m "feat: add form component routes to showcase"
```

---

### Task 8: Update sidebar navigation

**Files:**
- Modify: `projects/showcase/src/app/layout/sidebar/sidebar.ts`

- [ ] **Step 1: Read current sidebar**

Run: `cat projects/showcase/src/app/layout/sidebar/sidebar.ts`

- [ ] **Step 2: Update sidebar with form sections**

Replace the entire sections array with:

```typescript
  sections: NavSection[] = [
    {
      title: 'Getting Started',
      items: [
        { label: 'Introduction', path: '/', exact: true },
      ],
    },
    {
      title: 'Components',
      items: [
        { label: 'Button',  path: '/components/button' },
        { label: 'Badge',   path: '/components/badge' },
        { label: 'Alert',   path: '/components/alert' },
        { label: 'Card',    path: '/components/card' },
        { label: 'Spinner', path: '/components/spinner' },
      ],
    },
    {
      title: 'Inputs',
      items: [
        { label: 'Input',    path: '/components/input' },
        { label: 'Textarea', path: '/components/textarea' },
      ],
    },
    {
      title: 'Selection',
      items: [
        { label: 'Select',       path: '/components/select' },
        { label: 'Checkbox',     path: '/components/checkbox' },
        { label: 'Radio Group',  path: '/components/radio-group' },
      ],
    },
    {
      title: 'Containers',
      items: [
        { label: 'Form Field', path: '/components/form-field' },
      ],
    },
    {
      title: 'Design System',
      items: [
        { label: 'Colors',      path: '/design/colors' },
        { label: 'Typography',  path: '/design/typography' },
      ],
    },
  ];
```

**Result:** The complete file should be:

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem { label: string; path: string; exact?: boolean; }
interface NavSection { title: string; items: NavItem[]; }

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  sections: NavSection[] = [
    {
      title: 'Getting Started',
      items: [
        { label: 'Introduction', path: '/', exact: true },
      ],
    },
    {
      title: 'Components',
      items: [
        { label: 'Button',  path: '/components/button' },
        { label: 'Badge',   path: '/components/badge' },
        { label: 'Alert',   path: '/components/alert' },
        { label: 'Card',    path: '/components/card' },
        { label: 'Spinner', path: '/components/spinner' },
      ],
    },
    {
      title: 'Inputs',
      items: [
        { label: 'Input',    path: '/components/input' },
        { label: 'Textarea', path: '/components/textarea' },
      ],
    },
    {
      title: 'Selection',
      items: [
        { label: 'Select',       path: '/components/select' },
        { label: 'Checkbox',     path: '/components/checkbox' },
        { label: 'Radio Group',  path: '/components/radio-group' },
      ],
    },
    {
      title: 'Containers',
      items: [
        { label: 'Form Field', path: '/components/form-field' },
      ],
    },
    {
      title: 'Design System',
      items: [
        { label: 'Colors',      path: '/design/colors' },
        { label: 'Typography',  path: '/design/typography' },
      ],
    },
  ];
}
```

- [ ] **Step 3: Verify TypeScript syntax**

Run: `cd projects/showcase && npm run build 2>&1 | head -20`
Expected: No TypeScript errors about sidebar.ts

- [ ] **Step 4: Commit**

```bash
git add projects/showcase/src/app/layout/sidebar/sidebar.ts
git commit -m "feat: add form component sections to sidebar navigation"
```

---

### Task 9: Test navigation and routing

**Files:**
- Test: All route paths and sidebar navigation

- [ ] **Step 1: Start dev server**

Run: `cd projects/showcase && npm start`
Expected: Server starts on localhost:4200

- [ ] **Step 2: Test home page loads**

Open browser to `http://localhost:4200`
Expected: Home page loads, sidebar visible

- [ ] **Step 3: Test each form component route**

For each of these paths, click link in sidebar or navigate directly:
- `http://localhost:4200/components/input` - Input docs loads
- `http://localhost:4200/components/textarea` - Textarea docs loads
- `http://localhost:4200/components/select` - Select docs loads
- `http://localhost:4200/components/checkbox` - Checkbox docs loads
- `http://localhost:4200/components/radio-group` - Radio Group docs loads
- `http://localhost:4200/components/form-field` - Form Field docs loads

Expected: Each page loads correctly with breadcrumb, title, and documentation sections

- [ ] **Step 4: Test sidebar sections appear**

Expected:
- "Inputs" section visible with Input and Textarea links
- "Selection" section visible with Select, Checkbox, Radio Group links
- "Containers" section visible with Form Field link

- [ ] **Step 5: Test active link highlighting**

Click "Input" link, verify it's highlighted as active
Click "Textarea" link, verify Input unhighlights and Textarea highlights

Expected: Active link styling works correctly

- [ ] **Step 6: Stop server**

Run: `Ctrl+C` to stop dev server

- [ ] **Step 7: Verify no build errors**

Run: `cd projects/showcase && npm run build 2>&1 | tail -5`
Expected: Build completes successfully with no errors

---

### Task 10: Create PR

**Files:**
- Git: Commit all changes and create PR

- [ ] **Step 1: View all commits made**

Run: `git log --oneline | head -8`
Expected: See all task commits:
- "feat: add form-field component showcase documentation"
- "feat: add radio-group component showcase documentation"
- "feat: add checkbox component showcase documentation"
- "feat: add select component showcase documentation"
- "feat: add textarea component showcase documentation"
- "feat: add input component showcase documentation"
- "feat: add form component routes to showcase"
- "feat: add form component sections to sidebar navigation"

- [ ] **Step 2: Create feature branch**

Run: `git checkout -b feature/form-components-showcase`
Expected: Branch created and switched

- [ ] **Step 3: Push to remote**

Run: `git push -u origin feature/form-components-showcase`
Expected: Branch pushed to remote

- [ ] **Step 4: Create PR URL**

Create PR with title and body:

**Title:** Add form component showcase pages with navigation

**Body:**
```
## Summary

Adds comprehensive showcase documentation pages for 6 form components (Input, Textarea, Select, Checkbox, Radio Group, Form Field) with integrated navigation in the showcase app.

## Changes

- Created 6 new showcase documentation pages in `projects/showcase/src/app/pages/components/forms/`
- Added lazy-loaded routes for each form component
- Updated sidebar navigation with 3 new sections: "Inputs", "Selection", "Containers"
- Each page includes: validation examples, form integration patterns, error states, and API documentation

## Routes Added

- `/components/input` - Input component docs
- `/components/textarea` - Textarea component docs
- `/components/select` - Select component docs
- `/components/checkbox` - Checkbox component docs
- `/components/radio-group` - Radio Group component docs
- `/components/form-field` - Form Field component docs

## Navigation Structure

**Inputs section:** Input, Textarea
**Selection section:** Select, Checkbox, Radio Group
**Containers section:** Form Field

## Testing

- All pages load correctly when navigated to
- Sidebar links highlight active page correctly
- Breadcrumb navigation works on each page
- Documentation examples display properly
- No build errors or TypeScript warnings
```

- [ ] **Step 5: Note for manual PR creation**

If `gh` CLI is unavailable, create PR manually:
1. Visit: `https://github.com/usli-snap/usli-uikit/compare/main...YOUR_FORK:feature/form-components-showcase`
2. Fill in title and body from Step 4
3. Click "Create pull request"

---

## Self-Review Checklist

✅ **Spec Coverage:**
- 6 form component showcase pages created ✓
- Navigation with "Inputs", "Selection", "Containers" sections ✓
- Routes for all 6 components ✓
- Validation examples in each page ✓
- Form integration patterns in each page ✓
- Error states section in each page ✓
- API documentation in each page ✓

✅ **Placeholder Scan:**
- No TBD, TODO, or incomplete sections
- All code blocks complete and ready to execute
- All file paths exact and verified
- All commands include expected output

✅ **Type Consistency:**
- NavSection interface matches existing pattern
- Route paths consistent: `/components/<component-name>`
- Component exports: `InputDocs`, `TextareaDocs`, `SelectDocs`, `CheckboxDocs`, `RadioGroupDocs`, `FormFieldDocs`
- All imports consistent across files

✅ **No Missing Requirements:**
- All 6 component pages created
- All routes added
- All sidebar sections added
- Navigation tested
- PR created
