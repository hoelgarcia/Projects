<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <!-- c:out ; c:forEach ; c:if -->
  <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
    <!-- Formatting (like dates) -->
  <%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
    <!-- form:form -->
  <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>  
    <!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true" %>   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${project.title}</title>
  <!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
      rel="stylesheet" 
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
      crossorigin="anonymous">

</head>
<body>
  <c:choose>
    <c:when test="${project.user.id == user_id}">

    <div class="container"> <!-- Beginning of Container -->
        <h1>Project Details</h1>
        <a class="btn btn-primary" href="/dashboard">Go Back</a>
        <div>
          <table>
            <tr>
              <td> Title:</td>
              <td>${project.title}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>${project.description}</td>
            </tr>
            <tr>
              <td>Due Date:</td>
              <td><fmt:formatDate type = "date"  dateStyle = "long" value = "${project.dueDate}" /></td>
            </tr>
          </table>
        </div>
        <a class="btn btn-primary" href="/editProject/${project.id}">Edit Project</a>
        <a class="btn btn-danger" href="/deleteProject/${project.id}">Delete Project</a>
      </c:when>


      <c:otherwise>
        <div class="container"> <!-- Beginning of Container -->
          <h1>Project Details</h1>
          <a class="btn btn-primary" href="/dashboard">Go Back</a>
          <div>
            <table>
              <tr>
                <td>Project Title:</td>
                <td>${project.title}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>${project.description}</td>
              </tr>
              <tr>
                <td>Due Date:</td>
                <td><fmt:formatDate type = "date"  dateStyle = "long" value = "${project.dueDate}" /></td>
              </tr>
            </table>
          </div>
      </c:otherwise>
    </c:choose>

    </div> <!-- End of Container -->
</body>
</html>