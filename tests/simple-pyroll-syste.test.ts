;; Simple Payroll System
;; A minimal payroll implementation with two main functions:
;; 1. add-employee-payroll
;; 2. pay-employee

(define-constant err-owner-only (err u100))
(define-constant err-invalid-amount (err u101))
(define-constant err-not-employee (err u102))
(define-constant err-insufficient-funds (err u103))

;; Contract owner (the payroll administrator)
(define-constant contract-owner tx-sender)

;; Store employees' monthly salary in microSTX
(define-map employees principal uint)

;; Add or update an employee's salary (only contract owner)
(define-public (add-employee-payroll (employee principal) (salary uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (> salary u0) err-invalid-amount)
    (map-set employees employee salary)
    (ok true)))

;; Pay employee their salary (STX transfer)